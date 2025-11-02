import Breadcrumbs from "@/Components/BreadCrumbs";
import TrainingList from "@/Components/TrainingList";

export const metadata = {
  title: "Hazmat & Safety Training Oregon | HAZWOPER, Confined Space, Emergency Response",
  description: "Professional hazmat training in Oregon: HAZWOPER 40-hour certification, confined space entry, spill response, first responder training, and hazmat technician courses. OSHA-compliant safety training.",
  keywords: "hazmat training oregon, HAZWOPER certification, confined space training, emergency response training, spill response course, first responder training, hazmat technician, safety training eugene",
  openGraph: {
    title: "Professional Hazmat & Safety Training | NorthWest HazMat Oregon",
    description: "OSHA-compliant hazmat training courses including HAZWOPER certification, confined space entry, emergency response, and spill response training in Oregon.",
    url: "https://nwhazmat.com/training",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/40-Hour.jpg",
        width: 1200,
        height: 630,
        alt: "NorthWest HazMat professional training courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Hazmat & Safety Training | NorthWest HazMat Oregon",
    description: "OSHA-compliant hazmat training: HAZWOPER certification, confined space, emergency response, and more.",
    images: ["https://nwhazmat.com/img/40-Hour.jpg"],
  },
};

export default function Training() {
  return (
    <>
      <Breadcrumbs />
      <section className=" pb-10">
        <div className="text-black w-10/12 mx-auto py-14 text-5xl fjalla-one">
          <h1 className="text-6xl lg:text-8xl mb-4">Our Training Courses</h1>
          <p className="text-xl lg:text-2xl font-normal text-black">
            Comprehensive OSHA-compliant hazmat and safety training for Oregon
            businesses and emergency responders. From foundational awareness to
            advanced technician certification.
          </p>
        </div>
        <TrainingList />
      </section>
    </>
  );
}
