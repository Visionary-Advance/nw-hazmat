import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/Components/ClientWrapper";
import ReCaptchaProvider from "@/Components/ReCaptchaProvider";
import { Analytics } from "@vercel/analytics/next"

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
        url: "/img/Hazmat-Services.jpg",
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
    images: ["/img/Hazmat-Services.jpg"],
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
  
  // Local business structured data
  other: {
    "geo.region": "US-OR",
    "geo.placename": "Eugene, Springfield",
    "geo.position": "44.0521;-123.0868",
    "ICBM": "44.0521, -123.0868",
  },
  
  // Verification tags (add these when you have them)
  verification: {
    google: "your-google-verification-code", // Replace with actual code
    yandex: "your-yandex-verification-code", // If applicable
    yahoo: "your-yahoo-verification-code", // If applicable
  },
  
  // Favicon / icons
  icons: {
    icon: '/img/NorthWest_HazMat_Logo.png',
    apple: '/img/NorthWest_HazMat_Logo.png',
  },

  // Additional schema markup can be added via JSON-LD script tag
  // This would go in a separate component or in the head
}

// Additional structured data (JSON-LD) - Add this to your page or a separate component
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "NorthWest HazMat, Inc.",
  "description": "Professional hazmat handling, asbestos testing, mold remediation, and environmental cleanup services.",
  "url": "https://nwhazmat.com",
  "telephone": "+1-XXX-XXX-XXXX", // Replace with actual phone
  "email": "info@northwesthazmat.com", // Replace with actual email
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street Address",
    "addressLocality": "Your City",
    "addressRegion": "OR", // Adjust to your state
    "postalCode": "Your ZIP",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.5152", // Replace with actual coordinates
    "longitude": "-122.6784"
  },
  "openingHours": [
    "Mo-Fr 08:00-17:00",
    "Sa 08:00-12:00"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "45.5152",
      "longitude": "-122.6784"
    },
    "geoRadius": "50000" // 50km radius, adjust as needed
  },
  "services": [
    "Hazmat Services",
    "Mold Remediation",
    "Asbestos Testing",
    "Environmental Cleanup",
    "Hazardous Material Disposal",
    "Contamination Cleanup"
  ],
  "priceRange": "$$",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Hazmat and Remediation Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mold Remediation",
          "description": "Professional mold removal and remediation services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Asbestos Testing",
          "description": "Comprehensive asbestos testing and analysis"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hazmat Cleanup",
          "description": "Safe handling and disposal of hazardous materials"
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
        <ReCaptchaProvider>
          <ClientWrapper>{children}
            <Analytics />
          </ClientWrapper>
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
