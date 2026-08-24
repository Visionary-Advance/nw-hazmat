import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import Breadcrumbs from "@/Components/BreadCrumbs";

const TITLE =
  "Oregon Spill Response Service Area | Statewide Hazmat Coverage | Northwest Hazmat";
const DESCRIPTION =
  "Where Northwest Hazmat responds across Oregon: the I-5 corridor, Willamette Valley, coast, central, and eastern Oregon. Based in Springfield, 24-hour spill line 1-800-597-1323.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "oregon spill response service area, hazmat cleanup oregon cities, spill response portland salem eugene, spill response bend medford, i-5 corridor spill response",
  alternates: {
    canonical: "https://nwhazmat.com/oregon-spill-response-service-area",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://nwhazmat.com/oregon-spill-response-service-area",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/Spill_Response.jpg",
        width: 1200,
        height: 630,
        alt: "Northwest Hazmat spill response coverage across Oregon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://nwhazmat.com/img/Spill_Response.jpg"],
  },
};

// PENDING CLIENT CONFIRMATION (punch list #3): this is the city list exactly as
// Jon supplied it in the punch list, which carried the note "edit if we do not
// actually roll that far". The coast, central, and eastern Oregon groups are the
// ones most likely to need trimming. Removing a city here also removes it from
// the areaServed JSON-LD below, since both read from this same list.
const regions = [
  {
    name: "Portland metro and north Willamette Valley",
    cities: [
      "Portland",
      "Gresham",
      "Hillsboro",
      "Beaverton",
      "Oregon City",
      "Woodburn",
    ],
  },
  {
    name: "Mid-valley and capital area",
    cities: ["Salem", "Keizer", "Albany", "Corvallis", "McMinnville"],
  },
  {
    name: "South valley and our home area",
    cities: [
      "Springfield",
      "Eugene",
      "Cottage Grove",
      "Junction City",
      "Roseburg",
    ],
  },
  {
    name: "Southern Oregon",
    cities: ["Grants Pass", "Medford", "Ashland", "Klamath Falls"],
  },
  {
    name: "Central Oregon",
    cities: ["Bend", "Redmond", "The Dalles"],
  },
  {
    name: "Oregon coast",
    cities: ["Coos Bay", "Newport", "Astoria", "Tillamook"],
  },
  {
    name: "Eastern Oregon",
    cities: ["Pendleton", "Hermiston", "La Grande", "Ontario"],
  },
];

const allCities = regions.flatMap((region) => region.cities);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://nwhazmat.com/oregon-spill-response-service-area#service",
  name: "Spill and Hazmat Response Service Area, Oregon",
  description: DESCRIPTION,
  url: "https://nwhazmat.com/oregon-spill-response-service-area",
  serviceType: "24-hour spill and hazmat response",
  provider: {
    "@type": "LocalBusiness",
    "@id": "https://nwhazmat.com/#business",
    name: "NorthWest HazMat, Inc.",
    telephone: "+1-541-988-9823",
    url: "https://nwhazmat.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "36 West Q Street",
      addressLocality: "Springfield",
      addressRegion: "OR",
      postalCode: "97477",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "44.0489",
      longitude: "-123.0225",
    },
  },
  areaServed: [
    { "@type": "State", name: "Oregon" },
    ...allCities.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "State", name: "Oregon" },
    })),
  ],
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://nwhazmat.com/24-hour-spill-response-oregon",
    servicePhone: {
      "@type": "ContactPoint",
      telephone: "+1-800-597-1323",
      contactType: "emergency",
      availableLanguage: "English",
    },
  },
};

export default function OregonServiceArea() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Breadcrumbs />

      <section className="w-full bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="fjalla-one text-4xl lg:text-6xl leading-tight mb-6">
            Oregon Spill Response Service Area
          </h1>
          <p className="text-lg lg:text-xl poppins max-w-3xl text-gray-200">
            We are based at 36 West Q Street in Springfield, Oregon, and we run
            24-hour spill and hazmat response anywhere in the state. Crews and
            equipment stage from the Springfield yard and travel to the
            incident, along the I-5 corridor and out to the coast, central, and
            eastern Oregon.
          </p>
          <a
            href="tel:1-800-597-1323"
            className="mt-8 inline-flex items-center gap-3 bg-red-600 hover:bg-white hover:text-red-600 text-white text-xl lg:text-3xl font-bold rounded-lg px-7 py-4 duration-200"
          >
            <FaPhone aria-hidden="true" />
            1-800-597-1323
          </a>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="fjalla-one text-3xl lg:text-5xl mb-4 text-gray-900">
            Regions and cities we cover
          </h2>
          <p className="text-lg text-gray-700 poppins mb-10 max-w-3xl">
            If your site is not on this list, it does not mean we cannot get
            there. Call the spill line and ask.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regions.map((region) => (
              <div
                key={region.name}
                className="border border-gray-200 rounded-xl p-6"
              >
                <h3 className="fjalla-one text-xl mb-3 text-gray-900">
                  {region.name}
                </h3>
                <ul className="text-gray-700 poppins space-y-1">
                  {region.cities.map((city) => (
                    <li key={city}>{city}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-lg text-gray-800 poppins pt-10 max-w-3xl">
            Our online shop ships spill kits and responder gear nationwide, so
            you do not need to be in Oregon to order.{" "}
            <Link href="/shop" className="underline hover:text-red-600">
              Browse the shop
            </Link>
            , or read more about{" "}
            <Link
              href="/24-hour-spill-response-oregon"
              className="underline hover:text-red-600"
            >
              our 24-hour spill response
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
