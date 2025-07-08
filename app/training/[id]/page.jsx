import { notFound } from "next/navigation";
import { training } from "@/data/TrainingData";
import Breadcrumbs from "@/Components/BreadCrumbs";
import Link from "next/link";
import GoButton from "@/Components/Go-Button";

// Generate static params using id instead of slug
export function generateStaticParams() {
  return training.map((trainings) => ({
    id: trainings.id || trainings.slug, // Fallback to slug if id doesn't exist yet
  }));
}

// Generate SEO metadata for each training page
export async function generateMetadata({ params }) {
  const id = params?.id;
  
  if (!id) {
    return {
      title: 'Training Not Found | NorthWest HazMat',
      description: 'The requested training page could not be found.',
    };
  }

  const trainings = training.find((t) => t.id === id || t.slug === id);

  if (!trainings) {
    return {
      title: 'Training Not Found | NorthWest HazMat',
      description: 'The requested training page could not be found.',
    };
  }

  const title = `${trainings.title} | NorthWest HazMat Oregon`;
  const description = trainings.description || 
    `Professional ${trainings.title.toLowerCase()} in Oregon. Expert hazmat training services in Eugene, Springfield, and Lane County. Call 541-988-9823.`;

  return {
    title,
    description,
    keywords: [
      trainings.title.toLowerCase(),
      'hazmat training',
      'Oregon hazmat training',
      'Eugene hazmat training',
      'Springfield hazmat training',
      'Lane County hazmat',
      'OSHA training',
      'EPA training',
      'hazardous materials training',
      'safety training Oregon',
      'environmental training',
    ].join(', '),
    
    // Open Graph for social sharing
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      url: `https://nwhazmat.com/training/${id}`,
      siteName: 'NorthWest HazMat',
      images: [
        {
          url: trainings.img || '/img/default-training.jpg',
          width: 1200,
          height: 630,
          alt: trainings.title,
        },
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [trainings.img || '/img/default-training.jpg'],
    },
    
    // Additional SEO
    alternates: {
      canonical: `https://nwhazmat.com/training/${id}`,
    },
    
    // Local SEO
    other: {
      'geo.region': 'US-OR',
      'geo.placename': 'Eugene, Oregon',
      'geo.position': '44.0521;-123.0868',
    },
  };
}

export default async function TrainingPage({ params }) {
  const id = params?.id;

  if (!id) {
    return notFound();
  }

  const trainings = training.find((s) => s.id === id || s.slug === id);

  if (!trainings) {
    console.log('Training not found for id:', id);
    return notFound();
  }

  // Structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": trainings.title,
    "description": trainings.description || `Professional ${trainings.title.toLowerCase()} training in Oregon`,
    "provider": {
      "@type": "Organization",
      "name": "NorthWest HazMat",
      "telephone": "541-988-9823",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Eugene",
        "addressRegion": "OR",
        "addressCountry": "US"
      }
    },
    "courseMode": "In-person",
    "educationalLevel": "Professional",
    "teaches": [
      "Hazardous materials handling",
      "Safety protocols",
      "Emergency response",
      "OSHA compliance",
      "EPA regulations"
    ],
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Breadcrumbs />
      <div className="flex flex-col-reverse md:flex-row ms-10 me-10 py-2 gap-6">
        {/* Sidebar */}
        <aside className="w-full md:max-w-sm space-y-4">
          {/* Training List */}
          <div className="bg-white rounded-[60px] p-4 shadow-xl border border-black/20">
            <h2 className="text-3xl text-center fjalla-one font-semibold mb-4">
              Our Training
            </h2>
            <nav aria-label="Training navigation">
              <ul className="space-y-2">
                {training.map((s) => {
                  const trainingId = s.id || s.slug;
                  const isActive = trainingId === id;
                  
                  return (
                    <li key={trainingId}>
                      <Link 
                        href={`/training/${trainingId}`}
                        className={`flex justify-between group items-center p-2 rounded cursor-pointer transition-colors ${
                          isActive ? "bg-black rounded-[60px] text-white" : "hover:bg-gray-200 rounded-[60px]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="text-2xl ms-2 py-3 fjalla-one">
                          {s.title}
                        </span>
                        <span className="">
                          {isActive ? "⬤" : <GoButton />}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Contact Box */}
          <div className="bg-white rounded-[60px] p-4 shadow border text-center relative flex items-center justify-center h-[400px]">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-80 rounded-[60px]"></div>

            {/* Image */}
            <img
              className="absolute inset-0 w-full h-full object-cover rounded-[60px]"
              src="/img/Call_Now_Side.png"
              alt="Contact NorthWest HazMat for training"
              loading="lazy"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-10">
              <Link href="tel:541-988-9823">
                <button className="text-xl text-white border border-white rounded-full inline-block mb-2 px-4 py-2 hover:bg-white hover:text-black transition-colors">
                  541-988-9823
                </button>
              </Link>
              <h3 className="text-white font-bold text-4xl mb-2">
                Get in Touch With Us
              </h3>
              <Link href="/contact">
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
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
              alt={`${trainings.title} training in Oregon`}
              className="rounded-[60px] shadow mb-10 h-96 object-cover w-full"
              loading="eager"
            />
          )}

          {/* Main Title - SEO Optimized */}
          <header className="mb-8">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">{trainings.title} in Oregon</h1>
            {trainings.description && (
              <p className="text-gray-800 mb-4 text-lg leading-relaxed">{trainings.description}</p>
            )}
          </header>

          {/* Page Info Sections */}
          <div className="prose prose-lg max-w-none">
            {trainings.pageInfo?.map((section, index) => (
              <section key={index} className="mb-8">
                {section.title && (
                  <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-900">
                    {section.title}
                  </h2>
                )}
                {section.description && (
                  <p className="mb-4 text-gray-700 leading-relaxed">{section.description}</p>
                )}
              </section>
            ))}
          </div>

          {/* What's Included Section */}
          {trainings.whatsIncluded && trainings.whatsIncluded.length > 0 && (
            <section className="mt-10">
              <h3 className="text-3xl font-bold mb-4">What's Included</h3>
              <ul className="list-disc list-inside text-lg space-y-2">
                {trainings.whatsIncluded.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-10">
            <h3 className="text-3xl font-bold mb-4">Classes We Offer</h3>
            <div className="mt-10 space-y-8">
              <div className="">
                <h4 className="text-2xl font-semibold mb-4">Refresher Class</h4>
                <p className="text-gray-700 leading-relaxed">
                  Refresher hazmat training reinforces critical skills and
                  updates workers on new safety standards. Regular training
                  helps maintain compliance with OSHA and EPA regulations while
                  ensuring a safe, hazard-free work environment. Groups must
                  have 5 or more participants.
                </p>
              </div>
              <div className="">
                <h4 className="text-2xl font-semibold mb-4">Initial Class</h4>
                <p className="text-gray-700 leading-relaxed">
                  Initial hazmat training provides essential knowledge for
                  safely handling hazardous materials. It covers hazard
                  identification, safe practices, and emergency response,
                  ensuring workers are prepared to prevent accidents and protect
                  themselves and others. Groups must have 5 or more
                  participants.
                </p>
              </div>
            </div>
          </section>

          {/* Group Sizes Section */}
          <section className="mt-10">
            <h3 className="text-4xl font-bold mb-4">Group Sizes</h3>
            <div className="w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="col-span-1 mx-auto text-center">
                <img
                  className="mx-auto"
                  alt="Small group hazmat training for 5-9 people"
                  src="/img/2_Group.png"
                  loading="lazy"
                />
                <p className="text-2xl font-bold">Group (5-9)</p>
                <p className="text-lg w-3/4 mx-auto text-gray-700">
                  Small group hazmat training for teams of 5 to 9. Improve
                  workplace safety with hands-on learning and real-world
                  scenarios.
                </p>
              </div>
              <div className="col-span-1 mx-auto text-center">
                <img
                  className="mx-auto"
                  alt="Large group hazmat training for 10 or more people"
                  src="/img/3_Group.png"
                  loading="lazy"
                />
                <p className="text-2xl font-bold">Large Group (10+)</p>
                <p className="text-lg w-3/4 mx-auto text-gray-700">
                  Comprehensive hazmat training for large groups. Ensure your
                  entire team stays compliant, prepared, and safe while handling
                  hazardous materials.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="mt-16 bg-gray-100 p-8 rounded-[60px] text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg text-gray-700 mb-6">
              Contact us today to schedule your hazmat training in Oregon. 
              We serve Eugene, Springfield, and all of Lane County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="tel:541-988-9823">
                <button className="bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800 transition-colors">
                  Call 541-988-9823
                </button>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-black text-black px-8 py-3 rounded-full text-lg hover:bg-black hover:text-white transition-colors">
                  Get Quote
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}