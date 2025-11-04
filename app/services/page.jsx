import Breadcrumbs from "@/Components/BreadCrumbs";
import ServiceList from "@/Components/ServiceList";

export const metadata = {
  title: "Hazmat Services Oregon | Mold Remediation, Lab Testing & Emergency Response",
  description: "Professional hazmat services in Oregon: 24/7 emergency response, mold remediation, soil remediation, biohazard cleanup, lab testing, and waste management consulting. Licensed & certified.",
  keywords: "hazmat services oregon, mold remediation eugene, soil remediation, biohazard cleanup, lab testing oregon, waste management consulting, hazardous waste consultants, emergency spill response",
  openGraph: {
    title: "Professional Hazmat Services | NorthWest HazMat Oregon",
    description: "24/7 emergency hazmat response, mold remediation, lab testing, and environmental cleanup services throughout Oregon. Licensed experts serving Lane County.",
    url: "https://nwhazmat.com/services",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/Hazmat-Services.jpg",
        width: 1200,
        height: 630,
        alt: "NorthWest HazMat professional services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Hazmat Services | NorthWest HazMat Oregon",
    description: "24/7 emergency hazmat response, mold remediation, and environmental cleanup services in Oregon.",
    images: ["https://nwhazmat.com/img/Hazmat-Services.jpg"],
  },
};

export default function Services() {
  return (
    <>
      <Breadcrumbs />
      <section className="bg-black pb-10">
        <div className="text-white w-10/12 mx-auto py-14 text-5xl fjalla-one">
          <h1 className="text-6xl lg:text-8xl mb-4">Our Services</h1>
          <p className="text-xl lg:text-2xl font-normal text-gray-300">
            Comprehensive hazmat solutions for Oregon businesses and residents.
            From emergency response to environmental consulting, we deliver safe,
            compliant, and effective results.
          </p>
        </div>
        <ServiceList />
      </section>
    </>
  );
}
