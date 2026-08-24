import Breadcrumbs from "@/Components/BreadCrumbs";
import ServiceList from "@/Components/ServiceList";

const SERVICES_TITLE =
  "Hazmat, Spill Response, Waste & Lab Services in Oregon | Northwest Hazmat";
const SERVICES_DESCRIPTION =
  "24-hour spill response, hazmat cleanup, hazardous waste disposal, asbestos and mold lab testing across Oregon. Based in Springfield, responding statewide since 2000. Call 1-800-597-1323.";

export const metadata = {
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  keywords: "hazmat services oregon, spill response oregon, emergency hazmat cleanup oregon, hazardous waste disposal oregon, soil remediation, biohazard cleanup, lab testing oregon, waste management consulting, asbestos testing oregon, mold remediation",
  alternates: {
    canonical: "https://nwhazmat.com/services",
  },
  openGraph: {
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    url: "https://nwhazmat.com/services",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/Hazmat-Services.jpg",
        width: 1200,
        height: 630,
        alt: "Northwest Hazmat services across Oregon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    images: ["https://nwhazmat.com/img/Hazmat-Services.jpg"],
  },
};

export default function Services() {
  return (
    <>
      <Breadcrumbs />
      <section className="bg-black pb-10">
        <div className="text-white w-10/12 mx-auto py-14 text-5xl fjalla-one">
          <h1 className="text-6xl lg:text-8xl mb-4">
            Hazmat and Environmental Services &mdash; Oregon Statewide
          </h1>
          <p className="text-xl lg:text-2xl font-normal text-gray-300">
            Comprehensive hazmat solutions for Oregon businesses and residents.
            From 24-hour spill response to environmental consulting, we deliver
            safe, compliant, and effective results anywhere in the state.
          </p>
        </div>
        <ServiceList />
      </section>
    </>
  );
}
