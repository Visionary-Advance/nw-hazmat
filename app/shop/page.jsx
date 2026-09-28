import ShopClient from "./ShopClient";
import { getAllProducts } from "@/lib/getProducts";

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "Hazmat Training Props, Spill Kits & Supplies | NorthWest HazMat",
  description: "Hazmat training props, tanker rollover simulators, spill kits, and leak control supplies for fire departments and response teams. Ships nationwide.",
  keywords: "hazmat training props, hazmat supplies, hazmat training equipment, spill kits, tanker rollover simulator, hazmat equipment, safety supplies, ppe equipment, spill response kits, hazmat training equipment, environmental safety gear, hazmat simulators, hazmat suits, respirators, safety equipment online, hazmat gear USA, professional safety supplies",
  alternates: {
    canonical: "https://nwhazmat.com/shop",
  },
  openGraph: {
    title: "Hazmat Training Props, Spill Kits & Supplies | NorthWest HazMat",
    description: "Hazmat training props, tanker rollover simulators, spill kits, and leak control supplies for fire departments and response teams. Ships nationwide.",
    url: "https://nwhazmat.com/shop",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Hazmat training props, spill kits, and response supplies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hazmat Training Props, Spill Kits & Supplies | NorthWest HazMat",
    description: "Hazmat training props, tanker rollover simulators, spill kits, and leak control supplies for fire departments and response teams. Ships nationwide.",
    images: ["https://nwhazmat.com/img/og-default.jpg"],
  },
  // Override geo tags for shop - make it national instead of regional
  other: {
    "geo.region": "US", // National scope (all states)
    "geo.placename": "United States", // Nationwide
  },
};

export default async function Shop() {
  const products = await getAllProducts();
  return <ShopClient initialProducts={products} />;
}
