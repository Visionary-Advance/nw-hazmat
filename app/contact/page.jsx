import ContactClient from "./ContactClient";
import ReCaptchaProvider from "@/Components/ReCaptchaProvider";

export const metadata = {
  title: "Contact NorthWest HazMat | 24/7 Emergency Response Eugene Oregon",
  description: "Contact NorthWest HazMat for hazmat response, mold remediation, and environmental services in Eugene, Oregon. Call 541-988-9823 or 24/7: 1-800-597-1323.",
  keywords: "contact hazmat eugene oregon, emergency spill response, mold remediation contact, hazmat services lane county, 24/7 emergency response",
  alternates: {
    canonical: "https://nwhazmat.com/contact",
  },
  openGraph: {
    title: "Contact NorthWest HazMat | Emergency Response Eugene Oregon",
    description: "24/7 emergency hazmat response in Lane County. Contact us for mold remediation, spill response, and environmental services.",
    url: "https://nwhazmat.com/contact",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/Hazmat-Services.jpg",
        width: 1200,
        height: 630,
        alt: "Contact NorthWest HazMat for emergency services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact NorthWest HazMat | Emergency Response Eugene Oregon",
    description: "24/7 emergency hazmat response in Lane County, Oregon.",
    images: ["https://nwhazmat.com/img/Hazmat-Services.jpg"],
  },
};

// Structured data for contact page
const contactStructuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "NorthWest HazMat, Inc.",
    "telephone": "+1-541-988-9823",
    "email": "info@nwhazmat.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "36 West Q Street",
      "addressLocality": "Springfield",
      "addressRegion": "OR",
      "postalCode": "97477",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "44.0489",
      "longitude": "-123.0225"
    },
    "areaServed": { "@type": "State", "name": "Oregon" },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-800-597-1323",
        "contactType": "emergency",
        "areaServed": "US-OR",
        "availableLanguage": "English",
        "hoursAvailable": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday", "Tuesday", "Wednesday", "Thursday",
              "Friday", "Saturday", "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          }
        ]
      }
    ]
  }
};

export default function Contact() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactStructuredData),
        }}
      />
      <ReCaptchaProvider>
        <ContactClient />
      </ReCaptchaProvider>
    </>
  );
}
