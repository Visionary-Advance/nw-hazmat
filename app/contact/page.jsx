import ContactClient from "./ContactClient";
import ReCaptchaProvider from "@/Components/ReCaptchaProvider";

const CONTACT_TITLE =
  "Contact Northwest Hazmat | 24/7 Spill Response Oregon | 1-800-597-1323";
const CONTACT_DESCRIPTION =
  "Reach Northwest Hazmat for 24-hour spill and hazmat response anywhere in Oregon. Emergency line 1-800-597-1323, office 541-988-9823, yard at 36 West Q Street, Springfield.";

export const metadata = {
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  keywords: "contact northwest hazmat, 24 hour spill response oregon, emergency spill response oregon, hazmat cleanup oregon, springfield oregon hazmat, 24/7 emergency response",
  alternates: {
    canonical: "https://nwhazmat.com/contact",
  },
  openGraph: {
    title: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    url: "https://nwhazmat.com/contact",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Northwest Hazmat for 24-hour spill response in Oregon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    images: ["https://nwhazmat.com/img/og-default.jpg"],
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
