import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/Components/ClientWrapper";
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@next/third-parties/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // Metadata base URL for resolving relative URLs
  metadataBase: new URL('https://nwhazmat.com'),

  // Canonical URL - tells Google the preferred version of each page
  alternates: {
    canonical: './',
  },

  // Primary SEO tags
  title: "NorthWest HazMat, Inc. | Professional Hazmat & Mold Remediation Services",
  description: "Professional hazmat handling, asbestos testing, mold remediation, and environmental cleanup services. Licensed experts serving the Pacific Northwest with 24/7 emergency response.",
  
  // Additional SEO metadata
  keywords: "hazmat services, mold remediation, asbestos testing, environmental cleanup, hazardous material disposal, mold removal, asbestos abatement, contamination cleanup, emergency hazmat response",
  
  // Open Graph tags for social media
  openGraph: {
    title: "NorthWest HazMat, Inc. | Professional Hazmat & Mold Remediation Services",
    description: "Professional hazmat handling, asbestos testing, mold remediation, and environmental cleanup services. Licensed experts serving the Pacific Northwest.",
    url: "https://nwhazmat.com",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/img/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "NorthWest HazMat professional hazmat and mold remediation services",
      },
    ],
  },

  // Twitter Card tags
  twitter: {
    card: "summary_large_image",
    title: "NorthWest HazMat, Inc. | Professional Hazmat & Mold Remediation Services",
    description: "Professional hazmat handling, asbestos testing, mold remediation, and environmental cleanup services in the Pacific Northwest.",
    images: ["/img/og-default.jpg"],
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Local business structured data — single pin: Springfield yard, 36 West Q Street.
  other: {
    "geo.region": "US-OR",
    "geo.placename": "Springfield",
    "geo.position": "44.0489;-123.0225",
    "ICBM": "44.0489, -123.0225",
  },

  // Verification tags. Google code comes from Search Console once the property is
  // verified (punch list #11); leaving a placeholder in the head is worse than
  // omitting the tag, so this stays out until we have the real value.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),

  // Favicon / icons
  icons: {
    icon: '/img/NorthWest_HazMat_Logo.png',
    apple: '/img/NorthWest_HazMat_Logo.png',
  },

  // Additional schema markup can be added via JSON-LD script tag
  // This would go in a separate component or in the head
}

// LocalBusiness structured data (JSON-LD) rendered in the root layout below.
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://nwhazmat.com/#business",
  "name": "NorthWest HazMat, Inc.",
  "description":
    "Female-owned environmental, hazmat, and mold remediation company serving Eugene-Springfield and Lane County, Oregon since 2000. 24/7 emergency spill response, asbestos testing, biohazard cleanup, and hazardous waste disposal.",
  "url": "https://nwhazmat.com",
  "telephone": "+1-541-988-9823",
  "email": "office@nwhazmat.com",
  "foundingDate": "2000",
  "image": "https://nwhazmat.com/img/og-default.jpg",
  "logo": "https://nwhazmat.com/img/NorthWest_HazMat_Logo.png",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "36 West Q Street",
    "addressLocality": "Springfield",
    "addressRegion": "OR",
    "postalCode": "97477",
    "addressCountry": "US"
  },
  "geo": {
    // NOTE: approximate coordinates for 36 W Q St, Springfield OR — verify against your Google Business Profile pin.
    "@type": "GeoCoordinates",
    "latitude": "44.0489",
    "longitude": "-123.0225"
  },
  "areaServed": [
    { "@type": "State", "name": "Oregon" },
    { "@type": "City", "name": "Springfield" },
    { "@type": "City", "name": "Eugene" },
    { "@type": "AdministrativeArea", "name": "Lane County" }
  ],
  // Office / walk-in / lab hours only. The 24-hour spill line is modeled on the
  // emergency contactPoint below so "open now" emergency search does not see us
  // as closed nights and weekends.
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00",
      "name": "Office and lab"
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-541-988-9823",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "English",
      "hoursAvailable": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      ]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-800-597-1323",
      "contactType": "emergency",
      "areaServed": "US",
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
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Hazmat and Remediation Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mold Remediation",
          "description": "Professional mold removal and remediation services in Eugene-Springfield, Oregon"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Asbestos Testing",
          "description": "Comprehensive asbestos testing and lab analysis"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hazmat Cleanup",
          "description": "Safe handling and disposal of hazardous materials"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "HAZWOPER Training",
          "description": "OSHA-compliant HAZWOPER 40-hour, 24-hour, and 8-hour refresher training"
        }
      }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
         <head>
        {/* Other head content */}
       
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ClientWrapper>{children}
          <Analytics />
        </ClientWrapper>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
