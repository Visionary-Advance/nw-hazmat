import MoldServicesClient from './MoldServicesClient';

export const metadata = {
  title: "Mold Remediation Eugene Oregon | Professional Mold Removal Services",
  description: "Professional mold remediation in Eugene-Springfield, Oregon. Free inspection, EPA-certified removal & moisture control. Serving Lane County since 2000.",
  keywords: "mold remediation eugene oregon, mold removal springfield, black mold removal eugene, mold inspection lane county, professional mold services oregon",
  alternates: {
    canonical: "https://nwhazmat.com/mold-services-eugene-oregon",
  },
  openGraph: {
    title: "Professional Mold Remediation Services | Eugene Oregon",
    description: "Expert mold inspection, removal, and prevention in Eugene-Springfield. EPA-certified, 25+ years experience. Free inspection available.",
    url: "https://nwhazmat.com/mold-services-eugene-oregon",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/Mold-Remi.jpg",
        width: 1200,
        height: 630,
        alt: "Professional mold remediation services in Eugene Oregon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Mold Remediation Services | Eugene Oregon",
    description: "Expert mold inspection, removal, and prevention in Eugene-Springfield, Oregon.",
    images: ["https://nwhazmat.com/img/Mold-Remi.jpg"],
  },
};

export default function MoldRemediationLandingPage() {
  return <MoldServicesClient />;
}
