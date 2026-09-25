import AboutClient from "./AboutClient";

const ABOUT_TITLE =
  "About Northwest Hazmat | Springfield, Oregon Since 2000 | Spill Response in OR, WA & CA";
const ABOUT_DESCRIPTION =
  "Female-owned environmental and hazmat company based at 36 West Q Street, Springfield, Oregon since 2000. 24-hour spill response across Oregon, Washington, and California, on-site lab, CCB #141189.";

export const metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  keywords: "about northwest hazmat, female owned hazmat company, springfield oregon environmental services, oregon spill response company, washington spill response, california spill response, hazmat company history",
  alternates: {
    canonical: "https://nwhazmat.com/about",
  },
  openGraph: {
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    url: "https://nwhazmat.com/about",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/About_Header.jpg",
        width: 1200,
        height: 630,
        alt: "Northwest Hazmat team providing environmental services in Oregon, Washington and California",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: ["https://nwhazmat.com/img/About_Header.jpg"],
  },
};

export default function About() {
  return <AboutClient />;
}
