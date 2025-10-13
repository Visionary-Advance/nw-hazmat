import ShopClient from "./ShopClient";

export const metadata = {
  title: "Hazmat Equipment & Safety Supplies Shop | NorthWest HazMat Oregon",
  description: "Shop professional hazmat equipment, safety supplies, and environmental testing products. Quality gear for spill response, mold remediation, and hazardous materials handling in Oregon.",
  keywords: "hazmat equipment shop, safety supplies oregon, spill response gear, hazmat products, environmental safety equipment, ppe supplies eugene",
  openGraph: {
    title: "Hazmat Equipment Shop | NorthWest HazMat Oregon",
    description: "Professional hazmat equipment and safety supplies. Quality gear for environmental professionals in Oregon.",
    url: "https://nwhazmat.com/shop",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/Hazmat-Services.jpg",
        width: 1200,
        height: 630,
        alt: "NorthWest HazMat equipment and supplies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hazmat Equipment Shop | NorthWest HazMat Oregon",
    description: "Professional hazmat equipment and safety supplies for Oregon environmental professionals.",
    images: ["https://nwhazmat.com/img/Hazmat-Services.jpg"],
  },
};

export default function Shop() {
  return <ShopClient />;
}
