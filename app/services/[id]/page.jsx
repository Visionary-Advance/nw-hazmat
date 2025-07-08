import { notFound } from 'next/navigation';
import { services } from '@/data/ServicesData';
import Breadcrumbs from '@/Components/BreadCrumbs';
import Link from 'next/link';
import GoButton from '@/Components/Go-Button';

// Generate static params using id instead of slug
export function generateStaticParams() {
  return services.map(service => ({
    id: service.id || service.slug,
  }));
}

// Generate SEO-optimized metadata for each service page
export async function generateMetadata({ params }) {
  const id = params?.id;
  
  if (!id) {
    return {
      title: 'Service Not Found | NorthWest HazMat',
      description: 'The requested service page could not be found.',
    };
  }

  const service = services.find(s => s.id === id || s.slug === id);

  if (!service) {
    return {
      title: 'Service Not Found | NorthWest HazMat',
      description: 'The requested service page could not be found.',
    };
  }

  // Create SEO-optimized title (under 60 characters)
  const title = `${service.title} | NorthWest HazMat Oregon`;
  
  // Create compelling meta description (under 160 characters)
  const description = service.shortDescription.length > 150 
    ? service.shortDescription.substring(0, 147) + '...'
    : service.shortDescription;

  // Generate keywords from service data
  const keywords = [
    ...service.keywords || [],
    'Oregon hazmat services',
    'Lane County environmental',
    'Eugene Springfield hazmat',
    'professional hazmat cleanup',
    'certified hazmat contractors'
  ].join(', ');

  // Create canonical URL
  const canonicalUrl = `https://nwhazmat.com/services/${service.id}`;

  return {
    title,
    description,
    keywords,
    
    // Open Graph tags for social media
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'NorthWest HazMat, Inc.',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: service.img ? `https://nwhazmat.com${service.img}` : 'https://nwhazmat.com/img/og-default.jpg',
          width: 1200,
          height: 630,
          alt: `${service.title} - Professional hazmat services in Oregon`,
          type: 'image/jpeg',
        },
      ],
    },

    // Twitter Card tags
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [service.img ? `https://nwhazmat.com${service.img}` : 'https://nwhazmat.com/img/twitter-default.jpg'],
      creator: '@NorthWestHazMat', // Replace with your actual Twitter handle
    },

    // Additional SEO tags
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },

    // Additional metadata
    other: {
      // Local business markup
      'geo.region': 'US-OR',
      'geo.placename': 'Eugene, Springfield',
      'geo.position': '44.0521;-123.0868',
      'ICBM': '44.0521, -123.0868',
      
      // Service-specific
      'service-area': 'Lane County, Oregon, Eugene, Springfield, Pacific Northwest',
      'business-type': 'Hazmat Services, Environmental Cleanup',
      'emergency-contact': '1-800-597-1323',
    },

    // Structured data will be added via JSON-LD in the component
  };
}

export default function ServicePage({ params }) {
  const id = params?.id;

  if (!id) {
    return notFound();
  }

  const service = services.find(s => s.id === id || s.slug === id);

  if (!service) {
    console.log('Service not found for id:', id);
    return notFound();
  }

  // Structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "NorthWest HazMat, Inc.",
      "image": "https://nwhazmat.com/img/NorthWest-HazMat-Logo.png",
      "telephone": "+1-541-988-9823",
      "email": "office@nwhazmat.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "36 West Q Street",
        "addressLocality": "Springfield",
        "addressRegion": "OR",
        "postalCode": "97477",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "44.0521",
        "longitude": "-123.0868"
      },
      "url": "https://nwhazmat.com",
      "sameAs": [
        "https://www.facebook.com/NorthWestHazMat/"
      ],
      "openingHours": "Mo-Fr 08:00-17:00",
      "priceRange": "$$"
    },
    "serviceType": service.title,
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "44.0521",
        "longitude": "-123.0868"
      },
      "geoRadius": "50000"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://nwhazmat.com/services/${service.id}`,
      "servicePhone": "+1-541-988-9823"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  // Emergency services get additional schema
  if (service.eButton) {
    structuredData["@type"] = "EmergencyService";
    structuredData.availableChannel.servicePhone = "+1-800-597-1323";
  }

  return (
    <>
      {/* Structured Data JSON-LD */}
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
          {/* Service List */}
          <div className="bg-white rounded-[60px] p-4 shadow-xl border border-black/20">
            <h2 className="text-3xl text-center fjalla-one font-semibold mb-4">Our Services</h2>
            <nav aria-label="Service navigation">
              <ul className="space-y-2">
                {services.map((s) => {
                  const serviceId = s.id || s.slug;
                  const isActive = serviceId === id;
                  
                  return (
                    <li key={serviceId}>
                      <Link 
                        href={`/services/${serviceId}`}
                        className={`flex justify-between group items-center p-2 rounded cursor-pointer transition-colors ${
                          isActive ? "bg-black rounded-[60px] text-white" : "hover:bg-gray-200 rounded-[60px]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="text-2xl ms-2 py-3 fjalla-one">{s.title}</span>
                        <span>{isActive ? "⬤" : <GoButton />}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Contact Box */}
          <div className="bg-white rounded-[60px] p-4 shadow border text-center relative flex items-center justify-center h-[400px]">
            <div className="absolute inset-0 bg-black opacity-50 rounded-[60px]"></div>
            <img 
              className='absolute inset-0 w-full h-full object-cover rounded-[60px]' 
              src='/img/Call_Now_Side.png' 
              alt='Professional hazmat team ready to help'
              loading="lazy"
            />
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-10">
              <Link href="tel:541-988-9823">
                <button className="text-xl text-white border border-white rounded-full inline-block mb-2 px-4 py-2 hover:bg-white hover:text-black transition-colors">
                  541-988-9823
                </button>
              </Link>
              <h3 className="text-white font-bold text-4xl mb-2">Get in Touch With Us</h3>
              <Link href='/contact'>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:w-2/3 mx-auto">
          {/* Emergency Banner */}
          {service.eButton && (
            <div className="mb-4">
              <Link href="tel:1-800-597-1323">
                <button className="bg-red-500 hover:bg-red-600 text-white rounded-[20px] text-center lg:text-3xl p-1 mb-4 w-full poppins active:scale-95 duration-150 transition-colors">
                  <span className="font-bold">Click Here </span> to Call 24/7 Emergency Services
                </button>
              </Link>
            </div>
          )}

          {/* Hero Image */}
          {service.img && (
            <img
              src={service.img}
              alt={`${service.title} - Professional hazmat services in Oregon`}
              className="rounded-[60px] shadow mb-10 h-96 object-cover w-full"
              loading="eager" // Load hero image immediately
            />
          )}

          {/* Page Header */}
          <header className="mb-8">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">{service.title}</h1>
            {service.description && (
              <p className="text-gray-800 mb-4 text-lg leading-relaxed">{service.description}</p>
            )}
          </header>

          {/* Service Content */}
          <div className="prose prose-lg max-w-none">
            {service.pageInfo?.map((section, index) => (
              <section key={index} className="mb-8">
                {section.title && (
                  <h2 className="text-2xl font-bold mt-6 mb-2 text-gray-900">{section.title}</h2>
                )}
                {section.description && (
                  <p className="mb-4 text-gray-700 leading-relaxed">{section.description}</p>
                )}
                {section.img && (
                  <img 
                    className='w-full rounded-[60px] mb-10 h-96 object-cover shadow-lg' 
                    src={section.img} 
                    alt={section.title ? `${section.title} - ${service.title}` : `${service.title} service image`}
                    loading="lazy"
                  />
                )} 

                {section.listItems && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.listItems.map((item, i) => (
                      <li key={i} className="mb-2">
                        <span className="font-bold text-lg text-blue-600">{item.spanText}:</span>{' '}
                        <span className="text-gray-700">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold mb-3 text-blue-900">
              Need {service.title}?
            </h3>
            <p className="text-blue-800 mb-4">
              Our certified professionals are ready to help with your {service.title.toLowerCase()} needs in Lane County and throughout Oregon.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="tel:541-988-9823" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors">
                Call Now: (541) 988-9823
              </Link>
              <Link href="/contact" className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold text-center transition-colors">
                Get Free Quote
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}