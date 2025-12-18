import ShopClient from "./ShopClient";

export const metadata = {
  title: "Professional Hazmat Equipment & Safety Supplies | Nationwide Shipping",
  description: "Buy professional hazmat equipment, safety gear, and environmental testing supplies online. Fast nationwide shipping across the USA. Quality PPE, spill response kits, hazmat training simulators, and safety equipment for environmental professionals, first responders, and industrial teams.",
  keywords: "hazmat equipment, safety supplies, ppe equipment, spill response kits, hazmat training equipment, environmental safety gear, hazmat simulators, hazmat suits, respirators, safety equipment online, hazmat gear USA, professional safety supplies",
  openGraph: {
    title: "Professional Hazmat Equipment & Safety Supplies | Nationwide Shipping",
    description: "Shop premium hazmat equipment and safety gear with fast shipping across the USA. Professional-grade PPE, training simulators, and environmental safety supplies.",
    url: "https://nwhazmat.com/shop",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/Hazmat-Services.jpg",
        width: 1200,
        height: 630,
        alt: "Professional hazmat equipment and safety supplies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Hazmat Equipment & Safety Supplies | Nationwide Shipping",
    description: "Shop premium hazmat equipment and safety gear with fast shipping across the USA. Professional-grade PPE and environmental safety supplies.",
    images: ["https://nwhazmat.com/img/Hazmat-Services.jpg"],
  },
  // Override geo tags for shop - make it national instead of regional
  other: {
    "geo.region": "US", // National scope (all states)
    "geo.placename": "United States", // Nationwide
    // Remove specific coordinates for shop to avoid regional bias
  },
};

export default function Shop() {
  return <ShopClient />;
}
