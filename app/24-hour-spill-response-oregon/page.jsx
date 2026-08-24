import Link from "next/link";
import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import Breadcrumbs from "@/Components/BreadCrumbs";

const TITLE =
  "24-Hour Spill Response Oregon | Diesel, Chemical & Transport Spills | Northwest Hazmat";
const DESCRIPTION =
  "24-hour spill response anywhere in Oregon. Diesel, hydraulic, chemical, transport and tanker, unknown substance, storm-drain, and facility spills. Crews roll from our Springfield yard. Call 1-800-597-1323.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "24 hour spill response oregon, emergency spill response oregon, diesel spill cleanup oregon, chemical spill cleanup oregon, transport spill response, tanker rollover cleanup oregon, storm drain spill, hazmat cleanup oregon",
  alternates: {
    canonical: "https://nwhazmat.com/24-hour-spill-response-oregon",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://nwhazmat.com/24-hour-spill-response-oregon",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/Spill_Response.jpg",
        width: 1200,
        height: 630,
        alt: "Northwest Hazmat crew responding to a spill in Oregon",
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

// What we actually roll on. No response-time or dispatch-time claims here:
// actual timing depends on crew availability, distance, and the incident, and
// the client is explicit that invented ETAs must not appear on the site.
const spillTypes = [
  {
    name: "Diesel and fuel spills",
    detail:
      "Tank ruptures, saddle-tank breaches, fueling overfills, and equipment leaks on road, rail, and yard sites.",
  },
  {
    name: "Hydraulic fluid releases",
    detail:
      "Line failures and cylinder blowouts on heavy equipment, loading docks, and industrial machinery.",
  },
  {
    name: "Chemical spills",
    detail:
      "Acids, bases, solvents, and process chemicals, with containment and compatibility handled before cleanup starts.",
  },
  {
    name: "Transport and tanker incidents",
    detail:
      "Rollovers, road incidents, and cargo breaches, including product transfer and recovery.",
  },
  {
    name: "Unknown substances",
    detail:
      "Unlabeled drums and unidentified releases, identified and characterized before anyone handles them.",
  },
  {
    name: "Storm-drain and waterway releases",
    detail:
      "Containment at the catch basin and downstream, to keep a release out of the storm system.",
  },
  {
    name: "Facility spills",
    detail:
      "Indoor and plant releases, secondary containment failures, and process-area cleanup.",
  },
];

// Kits we stock for crews and for customers who want their own response
// capability on site. Item #10 asks the spill page to link the shop.
const spillKits = [
  {
    slug: "5-gallon-spill-kit-bucket",
    name: "5-Gallon Spill Kit Bucket",
    detail: "Grab-and-go absorbent kit for vehicles, shops, and small releases.",
  },
  {
    slug: "plug-n-dike",
    name: "Plug N' Dike",
    detail: "Seals leaking drums, tanks, and containers to stop a release at the source.",
  },
  {
    slug: "storm-drain-filter",
    name: "Storm Drain Filter",
    detail: "Protects the catch basin while a release is contained and recovered.",
  },
  {
    slug: "pop-up-pool-catch-basin-100-gallon",
    name: "Pop-Up Pool Catch Basin, 100 Gallon",
    detail: "Portable containment for equipment, transfers, and recovered product.",
  },
  {
    slug: "spill-responder-kit-bags",
    name: "Spill Responder Kit Bags",
    detail: "Responder-carried absorbents and PPE for first-on-scene work.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EmergencyService",
  "@id": "https://nwhazmat.com/24-hour-spill-response-oregon#service",
  name: "24-Hour Spill Response, Northwest Hazmat",
  description: DESCRIPTION,
  url: "https://nwhazmat.com/24-hour-spill-response-oregon",
  telephone: "+1-800-597-1323",
  image: "https://nwhazmat.com/img/Spill_Response.jpg",
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
  areaServed: { "@type": "State", name: "Oregon" },
  // The spill line is staffed around the clock; office hours are separate and
  // live on the LocalBusiness record in the root layout.
  hoursAvailable: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
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

export default function SpillResponseOregon() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Breadcrumbs />

      {/* Hero — the 800 number comes first, per punch list item #2. */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/img/Spill_Response.jpg"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-16 lg:py-24">
          <h1 className="fjalla-one text-4xl lg:text-6xl leading-tight mb-6">
            24-Hour Spill Response Anywhere in Oregon
          </h1>

          <a
            href="tel:1-800-597-1323"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-white hover:text-red-600 text-white text-2xl lg:text-4xl font-bold rounded-lg px-8 py-5 duration-200"
          >
            <FaPhone aria-hidden="true" />
            1-800-597-1323
          </a>
          <p className="text-lg lg:text-xl pt-5 max-w-2xl poppins">
            Our spill line is staffed 24 hours a day, every day. Call and a
            responder will walk through what you are looking at, what to do to
            keep people clear of it, and what we need to roll.
          </p>
          <p className="text-base lg:text-lg pt-4 max-w-2xl poppins text-gray-300">
            We work from our yard at 36 West Q Street in Springfield and respond
            statewide &mdash; Portland, Salem, Eugene&ndash;Springfield, Bend,
            Medford, and the I-5 corridor between them.{" "}
            <Link
              href="/oregon-spill-response-service-area"
              className="underline hover:text-white"
            >
              See our Oregon service area
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Reporting obligation. Public-safety note first, our line second. */}
      <section className="w-full bg-yellow-50 border-y border-yellow-300">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="fjalla-one text-2xl lg:text-3xl mb-3 text-gray-900">
            Reporting a spill in Oregon
          </h2>
          <p className="text-lg text-gray-800 poppins">
            Oregon requires many spills and releases to be reported to the state.
            The Oregon Emergency Response System (OERS) takes those reports at{" "}
            <a href="tel:1-800-452-0311" className="font-semibold underline">
              1-800-452-0311
            </a>
            , and Oregon DEQ works from those reports. Report first if your
            release is reportable, then call us at{" "}
            <a href="tel:1-800-597-1323" className="font-semibold underline">
              1-800-597-1323
            </a>{" "}
            for the cleanup. If you are not sure whether a release is
            reportable, call OERS and ask.
          </p>
          <p className="text-base text-gray-700 poppins pt-3">
            If there is fire, injury, or an immediate threat to life, call 911
            first.
          </p>
        </div>
      </section>

      {/* What we roll on */}
      <section className="w-full bg-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="fjalla-one text-3xl lg:text-5xl mb-4 text-gray-900">
            What we roll on
          </h2>
          <p className="text-lg text-gray-700 poppins mb-10 max-w-3xl">
            Our crews are trained and equipped for hazardous material releases
            across road, rail, industrial, and facility settings, and we handle
            containment, recovery, characterization, and disposal as one job.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spillTypes.map((type) => (
              <div
                key={type.name}
                className="border border-gray-200 rounded-xl p-6 hover:border-red-600 duration-200"
              >
                <h3 className="fjalla-one text-xl mb-2 text-gray-900">
                  {type.name}
                </h3>
                <p className="text-gray-700 poppins">{type.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yard / who we are */}
      <section className="w-full bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="fjalla-one text-3xl lg:text-5xl mb-6 text-gray-900">
            Based in Springfield, responding statewide
          </h2>
          <p className="text-lg text-gray-800 poppins max-w-3xl">
            Northwest HazMat has operated out of 36 West Q Street in Springfield,
            Oregon since 2000. We are a female-owned company licensed under CCB
            #141189, we hold GSA MAS contract 47QRAA26D002R, and we keep an
            on-site lab for asbestos and mold analysis. Our crews and equipment
            stage from the Springfield yard and travel to the incident.
          </p>
          <div className="flex flex-wrap gap-4 pt-8">
            <Link
              href="/services/hazmat-services"
              className="bg-red-600 hover:bg-red-700 text-white fjalla-one text-lg rounded-lg px-6 py-3 duration-200"
            >
              All hazmat services
            </Link>
            <Link
              href="/oregon-spill-response-service-area"
              className="border border-gray-800 hover:bg-gray-800 hover:text-white text-gray-900 fjalla-one text-lg rounded-lg px-6 py-3 duration-200"
            >
              Oregon service area
            </Link>
            <Link
              href="/contact"
              className="border border-gray-800 hover:bg-gray-800 hover:text-white text-gray-900 fjalla-one text-lg rounded-lg px-6 py-3 duration-200"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* Shop cross-links — item #10 wants product URLs linked from here. */}
      <section className="w-full bg-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="fjalla-one text-3xl lg:text-5xl mb-4 text-gray-900">
            Spill kits and responder gear
          </h2>
          <p className="text-lg text-gray-700 poppins mb-10 max-w-3xl">
            We stock the same kits our crews carry, and we ship them anywhere in
            the United States. Oregon customers can also pick up at the
            Springfield yard.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spillKits.map((kit) => (
              <Link
                key={kit.slug}
                href={`/shop/${kit.slug}`}
                className="border border-gray-200 rounded-xl p-6 hover:border-red-600 hover:shadow-md duration-200"
              >
                <h3 className="fjalla-one text-xl mb-2 text-gray-900">
                  {kit.name}
                </h3>
                <p className="text-gray-700 poppins">{kit.detail}</p>
              </Link>
            ))}
          </div>
          <div className="pt-8">
            <Link
              href="/shop"
              className="fjalla-one text-lg underline hover:text-red-600"
            >
              Browse the full shop
            </Link>
          </div>
        </div>
      </section>

      {/* Closing call bar */}
      <section className="w-full bg-red-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-14 text-center">
          <h2 className="fjalla-one text-3xl lg:text-5xl mb-6">
            Have a spill right now?
          </h2>
          <a
            href="tel:1-800-597-1323"
            className="inline-flex items-center gap-3 bg-white text-red-600 hover:bg-black hover:text-white text-2xl lg:text-4xl font-bold rounded-lg px-8 py-5 duration-200"
          >
            <FaPhone aria-hidden="true" />
            1-800-597-1323
          </a>
          <p className="text-lg pt-5 poppins">
            Staffed 24 hours a day, every day, anywhere in Oregon.
          </p>
        </div>
      </section>
    </>
  );
}
