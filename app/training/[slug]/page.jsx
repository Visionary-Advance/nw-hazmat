import { notFound } from "next/navigation";
import { training } from "@/data/TrainingData";
import Breadcrumbs from "@/Components/BreadCrumbs";
import Link from "next/link";
import GoButton from "@/Components/Go-Button";

export function generateStaticParams() {
  return training.map((trainings) => ({
    slug: trainings.slug,
  }));
}

export default async function TrainingPage({ params }) {
  const slug = params.slug;

  const trainings = training.find((s) => s.slug === slug);

  if (!trainings) return notFound();

  return (
    <>
      <Breadcrumbs />
      <div className="flex flex-col-reverse md:flex-row ms-10 me-10 py-2 gap-6">
        {/* Sidebar */}
        <aside className="w-full md:max-w-sm space-y-4">
          {/* Service List */}
          <div className="bg-white  rounded-[60px] p-4 shadow-xl border border-black/20">
            <h2 className="text-3xl text-center fjalla-one font-semibold mb-4">
              Our Services
            </h2>
            <ul className="space-y-2">
              {training.map((s) => (
                <Link href={`/training/${s.slug}`} key={s.slug}>
                  <li
                    className={`flex justify-between group items-center p-2 rounded cursor-pointer ${
                      s.slug === slug
                        ? "bg-black rounded-[60px] text-white"
                        : "hover:bg-gray-200 rounded-[60px]"
                    }`}
                  >
                    <span className="text-2xl ms-2 py-3 fjalla-one">
                      {s.title}
                    </span>
                    <span className="">
                      {s.slug === slug ? "⬤" : <GoButton />}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Contact Box */}
          <div className="bg-white rounded-[60px] p-4 shadow border text-center relative flex items-center justify-center h-[400px]">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-80 rounded-[60px]"></div>

            {/* Image */}
            <img
              className="absolute inset-0 w-full h-full object-cover rounded-[60px]"
              src="/img/Call_Now_Side.png"
              alt=""
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-10">
              <Link href="tel:555-555-5555">
                <button className="text-xl text-white border border-white rounded-full inline-block mb-2 px-4">
                  555-555-5555
                </button>
              </Link>
              <h3 className="text-white font-bold text-4xl mb-2">
                Get in Touch With Us
              </h3>
              <Link href="/contact">
                <button className="bg-black text-white px-4 py-2 rounded">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:w-2/3 mx-auto">
          {/* Main Image */}
          {trainings.img && (
            <img
              src={trainings.img}
              alt={trainings.title}
              className="rounded-[60px] shadow mb-10 h-96 object-cover w-full"
            />
          )}

          {/* Main Title */}
          <h1 className="text-5xl font-bold mb-4">{trainings.title}</h1>

          {/* Main Description */}
          {trainings.description && (
            <p className="text-gray-800 mb-4">{trainings.description}</p>
          )}

          {/* Page Info Sections */}
          {trainings.pageInfo?.map((section, index) => (
            <div key={index}>
              {section.title && (
                <h2 className="text-2xl font-bold mt-6 mb-2">
                  {section.title}
                </h2>
              )}
              {section.description && (
                <p className="mb-2">{section.description}</p>
              )}
            </div>
          ))}

          {/* What's Included Section */}
          {trainings.whatsIncluded && trainings.whatsIncluded.length > 0 && (
            <div className="mt-10">
              <h3 className="text-3xl font-bold mb-4 ">What's Included</h3>
              <ul className="list-disc list-inside text-lg space-y-2">
                {trainings.whatsIncluded.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10">
            <h3 className="text-3xl font-bold mb-4">Classes We Offer</h3>
            <div className="mt-10">
              <div className="">
                <h3 className="text-2xl font-semibold mb-4">Refresher Class</h3>
                <p>
                  Refresher hazmat training reinforces critical skills and
                  updates workers on new safety standards. Regular training
                  helps maintain compliance with OSHA and EPA regulations while
                  ensuring a safe, hazard-free work environment. Groups must
                  have 5 or more participants.
                </p>
              </div>
              <div className="">
                <h3 className="text-2xl font-semibold mb-4">Initial Class</h3>
                <p>
                  Initial hazmat training provides essential knowledge for
                  safely handling hazardous materials. It covers hazard
                  identification, safe practices, and emergency response,
                  ensuring workers are prepared to prevent accidents and protect
                  themselves and others. Groups must have 5 or more
                  participants.
                </p>
              </div>
            </div>
          </div>

         

          {/* Group Sizes Section (STATIC, always here) */}
          <div className="mt-10">
            <h3 className="text-4xl font-bold mb-4">Group Sizes</h3>
            <div className="w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2">
              <div className="col-span-1 mx-auto text-center">
                <img
                  className="mx-auto"
                  alt="Group of 5-9"
                  src="/img/2_Group.png"
                />
                <p className="text-2xl font-bold">Group (5-9)</p>
                <p className="text-lg w-3/4 mx-auto">
                  Small group hazmat training for teams of 2 to 9. Improve
                  workplace safety with hands-on learning and real-world
                  scenarios.
                </p>
              </div>
              <div className="col-span-1 mx-auto text-center">
                <img
                  className="mx-auto"
                  alt="Group of 10 or more"
                  src="/img/3_Group.png"
                />
                <p className="text-2xl font-bold">Large Group (10+)</p>
                <p className="text-lg w-3/4 mx-auto">
                  Comprehensive hazmat training for large groups. Ensure your
                  entire team stays compliant, prepared, and safe while handling
                  hazardous materials.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
