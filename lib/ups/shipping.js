// lib/ups/shipping.js
// UPS Shipping API wrapper. Creates an actual shipment, returns tracking number
// + Base64 label image that can be printed or attached to emails.

import { getUpsAccessToken } from './auth';

const DEFAULT_DIMS = { length: 12, width: 10, height: 6 };
const DEFAULT_WEIGHT_LBS = 1;
const SERVICE_GROUND = '03';

function originAddress() {
  return {
    Name: process.env.UPS_ORIGIN_NAME || 'Shipper',
    AttentionName: process.env.UPS_ORIGIN_NAME || 'Shipper',
    ShipperNumber: process.env.UPS_ACCOUNT_NUMBER,
    Phone: { Number: process.env.UPS_ORIGIN_PHONE || '5415551234' },
    Address: {
      AddressLine: [process.env.UPS_ORIGIN_STREET],
      City: process.env.UPS_ORIGIN_CITY,
      StateProvinceCode: process.env.UPS_ORIGIN_STATE,
      PostalCode: process.env.UPS_ORIGIN_ZIP,
      CountryCode: process.env.UPS_ORIGIN_COUNTRY || 'US',
    },
  };
}

function buildPackages(items) {
  const packages = [];
  for (const item of items) {
    const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
    const weight = parseFloat(item.weight) || DEFAULT_WEIGHT_LBS;
    const length = parseFloat(item.length ?? item.metadata?.length) || DEFAULT_DIMS.length;
    const width = parseFloat(item.width ?? item.metadata?.width) || DEFAULT_DIMS.width;
    const height = parseFloat(item.height ?? item.metadata?.height) || DEFAULT_DIMS.height;

    for (let i = 0; i < qty; i++) {
      packages.push({
        Description: (item.name || 'Item').slice(0, 35),
        Packaging: { Code: '02', Description: 'Package' },
        Dimensions: {
          UnitOfMeasurement: { Code: 'IN' },
          Length: String(length),
          Width: String(width),
          Height: String(height),
        },
        PackageWeight: {
          UnitOfMeasurement: { Code: 'LBS' },
          Weight: String(Math.max(0.1, weight).toFixed(2)),
        },
      });
    }
  }
  return packages;
}

export async function createUpsShipment({ items, destination, customer }) {
  if (!items?.length) throw new Error('No items provided');
  if (!destination?.zipCode) throw new Error('Destination ZIP required');
  if (!customer?.firstName) throw new Error('Customer name required');

  const token = await getUpsAccessToken();
  const baseUrl = process.env.UPS_BASE_URL;
  const accountNumber = process.env.UPS_ACCOUNT_NUMBER;
  const labelFormat = process.env.UPS_LABEL_FORMAT || 'GIF';

  const shipper = originAddress();
  const recipientName = `${customer.firstName} ${customer.lastName || ''}`.trim();

  const body = {
    ShipmentRequest: {
      Request: {
        RequestOption: 'nonvalidate',
        TransactionReference: { CustomerContext: 'NWHazmat order' },
      },
      Shipment: {
        Description: 'NorthWest HazMat order',
        Shipper: shipper,
        ShipFrom: shipper,
        ShipTo: {
          Name: customer.company || recipientName,
          AttentionName: recipientName,
          Phone: { Number: customer.phone || '5415551234' },
          Address: {
            AddressLine: [destination.street, destination.apartment].filter(Boolean),
            City: destination.city,
            StateProvinceCode: destination.state,
            PostalCode: destination.zipCode,
            CountryCode: destination.country || 'US',
          },
        },
        PaymentInformation: {
          ShipmentCharge: {
            Type: '01',
            BillShipper: { AccountNumber: accountNumber },
          },
        },
        Service: { Code: SERVICE_GROUND, Description: 'Ground' },
        Package: buildPackages(items),
      },
      LabelSpecification: {
        LabelImageFormat: { Code: labelFormat },
        HTTPUserAgent: 'Mozilla/5.0',
      },
    },
  };

  const res = await fetch(`${baseUrl}/api/shipments/v2403/ship`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      transId: `nwh-ship-${Date.now()}`,
      transactionSrc: 'nwhazmat-checkout',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`UPS Shipping failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const results = data?.ShipmentResponse?.ShipmentResults;
  if (!results) throw new Error('UPS Shipping: no ShipmentResults in response');

  const pkgResults = Array.isArray(results.PackageResults)
    ? results.PackageResults
    : results.PackageResults
    ? [results.PackageResults]
    : [];

  if (pkgResults.length === 0) throw new Error('UPS Shipping: no PackageResults');

  // Primary tracking number for the shipment as a whole
  const shipmentTracking = results.ShipmentIdentificationNumber || pkgResults[0].TrackingNumber;

  // One label per package
  const labels = pkgResults.map((p) => ({
    trackingNumber: p.TrackingNumber,
    labelData: p.ShippingLabel?.GraphicImage,
    labelFormat: p.ShippingLabel?.ImageFormat?.Code || labelFormat,
  }));

  return {
    shipmentTrackingNumber: shipmentTracking,
    labels,
  };
}
