import AboutClient from "./AboutClient";

export const metadata = {
  title: "About NorthWest HazMat | 25+ Years Serving Oregon Since 2000",
  description: "Female-owned environmental company serving Lane County since 2000. Full-service hazmat response, mold remediation, and environmental management in Eugene-Springfield, Oregon.",
  keywords: "about northwest hazmat, female owned hazmat company, eugene oregon environmental services, lane county hazmat, hazmat company history",
  alternates: {
    canonical: "https://nwhazmat.com/about",
  },
  openGraph: {
    title: "About NorthWest HazMat, Inc.",
    description: "Female-owned environmental company serving Lane County since 2000. Professional hazmat response and environmental management services.",
    url: "https://nwhazmat.com/about",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/About_Header.jpg",
        width: 1200,
        height: 630,
        alt: "NorthWest HazMat team providing environmental services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About NorthWest HazMat | 25+ Years Experience",
    description: "Female-owned environmental company serving Lane County since 2000.",
    images: ["https://nwhazmat.com/img/About_Header.jpg"],
  },
};

export default function About() {
  return <AboutClient />;
}
