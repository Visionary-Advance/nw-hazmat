// lib/ups/rating.js
// UPS Rating API wrapper. Returns Ground rate for a cart shipping to a destination.

import { getUpsAccessToken } from './auth';

const DEFAULT_DIMS = { length: 12, width: 10, height: 6 };
const DEFAULT_WEIGHT_LBS = 1;
const SERVICE_GROUND = '03';

function originAddress() {
  return {
    Name: process.env.UPS_ORIGIN_NAME || 'Shipper',
    ShipperNumber: process.env.UPS_ACCOUNT_NUMBER,
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
        PackagingType: { Code: '02', Description: 'Package' },
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

export async function getUpsGroundRate({ items, destination }) {
  if (!items?.length) throw new Error('No items provided');
  if (!destination?.zipCode) throw new Error('Destination ZIP required');

  const token = await getUpsAccessToken();
  const baseUrl = process.env.UPS_BASE_URL;
  const accountNumber = process.env.UPS_ACCOUNT_NUMBER;

  const shipper = originAddress();
  const body = {
    RateRequest: {
      Request: {
        TransactionReference: { CustomerContext: 'NWHazmat checkout rating' },
      },
      Shipment: {
        Shipper: shipper,
        ShipTo: {
          Name: destination.name || 'Customer',
          Address: {
            AddressLine: [destination.street || ''],
            City: destination.city || '',
            StateProvinceCode: destination.state || '',
            PostalCode: destination.zipCode,
            CountryCode: destination.country || 'US',
          },
        },
        ShipFrom: shipper,
        PaymentDetails: {
          ShipmentCharge: {
            Type: '01',
            BillShipper: { AccountNumber: accountNumber },
          },
        },
        Service: { Code: SERVICE_GROUND, Description: 'Ground' },
        Package: buildPackages(items),
      },
    },
  };

  const res = await fetch(`${baseUrl}/api/rating/v2403/Rate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      transId: `nwh-${Date.now()}`,
      transactionSrc: 'nwhazmat-checkout',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`UPS Rating failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const rated = data?.RateResponse?.RatedShipment;
  if (!rated) {
    throw new Error('UPS Rating returned no RatedShipment');
  }

  const charges = Array.isArray(rated) ? rated[0].TotalCharges : rated.TotalCharges;
  const transit = Array.isArray(rated)
    ? rated[0].GuaranteedDelivery?.BusinessDaysInTransit
    : rated.GuaranteedDelivery?.BusinessDaysInTransit;

  const amount = parseFloat(charges?.MonetaryValue);
  if (!Number.isFinite(amount)) {
    throw new Error('UPS Rating: missing monetary value');
  }

  return {
    service: 'GROUND',
    serviceCode: SERVICE_GROUND,
    displayName: 'UPS Ground',
    amount,
    currency: charges.CurrencyCode || 'USD',
    transitDays: transit ? parseInt(transit, 10) : null,
  };
}
