import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Mold Remediation Eugene Oregon | Professional Mold Removal Services",
  description: "Professional mold remediation in Eugene-Springfield, Oregon. Free inspection, EPA-certified removal, moisture control & prevention. Serving Lane County since 2000. Call 541-988-9823.",
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

export default function MoldRemediationLanding() {
  const moldServices = [
    {
      title: "Mold Inspection & Testing",
      icon: "🔍",
      description: "Comprehensive visual inspection and air quality testing to identify mold presence and species",
      features: ["Free visual inspection", "Air quality sampling", "Surface testing", "Moisture assessment", "Detailed lab analysis", "Insurance documentation"]
    },
    {
      title: "Professional Mold Removal",
      icon: "🧽",
      description: "Safe, thorough mold remediation using EPA-approved methods and HEPA filtration systems",
      features: ["HEPA air filtration", "Containment barriers", "Safe mold removal", "Antimicrobial treatment", "Material disposal", "Post-remediation testing"]
    },
    {
      title: "Moisture Control Solutions",
      icon: "💧",
      description: "Address the root cause with comprehensive moisture control and prevention strategies",
      features: ["Source identification", "Ventilation improvement", "Humidity control", "Waterproofing", "Drainage solutions", "Prevention planning"]
    },
    {
      title: "Preventative Maintenance",
      icon: "🛡️",
      description: "Ongoing monitoring and maintenance to prevent future mold growth in your property",
      features: ["Annual inspections", "Seasonal monitoring", "HVAC maintenance", "Moisture alerts", "Prevention education", "Warranty protection"]
    }
  ];

  const whyChooseUs = [
    { title: "25+ Years Experience", desc: "Serving Eugene-Springfield since 2000", icon: "🏆" },
    { title: "EPA Certified", desc: "Licensed and certified professionals", icon: "✅" },
    { title: "Advanced Equipment", desc: "HEPA filtration and containment systems", icon: "🔬" },
    { title: "Insurance Approved", desc: "Direct billing with major insurers", icon: "💼" },
    { title: "Health Focused", desc: "Your family's safety is our priority", icon: "❤️" },
    { title: "Warranty Included", desc: "Peace of mind with service guarantees", icon: "🛡️" }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Free Inspection",
      description: "We start with a comprehensive visual inspection of your property to identify potential mold issues and moisture sources."
    },
    {
      step: "2", 
      title: "Testing & Analysis",
      description: "Professional air quality and surface testing with detailed lab analysis to determine mold types and concentration levels."
    },
    {
      step: "3",
      title: "Custom Remediation Plan",
      description: "Based on our findings, we create a tailored remediation strategy that addresses your specific mold situation."
    },
    {
      step: "4",
      title: "Safe Removal Process",
      description: "Using EPA-approved methods, we safely remove mold while protecting your family and preventing cross-contamination."
    },
    {
      step: "5",
      title: "Prevention & Monitoring",
      description: "We address moisture sources and provide ongoing monitoring to prevent future mold growth."
    }
  ];

  const testimonials = [
    {
      text: "NorthWest HazMat found mold in our basement that other companies missed. Their thorough inspection and professional remediation gave us peace of mind.",
      name: "Sarah M.",
      location: "Eugene, OR"
    },
    {
      text: "The team was professional, clean, and explained everything clearly. Our house feels safe again, and we love the prevention plan they provided.",
      name: "Mike R.", 
      location: "Springfield, OR"
    },
    {
      text: "Excellent service from start to finish. They worked directly with our insurance and made the whole process stress-free.",
      name: "Jennifer K.",
      location: "Eugene, OR"
    }
  ];

  return (
    <>
    
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
          <div className="w-11/12 lg:max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl lg:text-7xl fjalla-one font-bold text-gray-900 mb-6">
                  Professional Mold Remediation
                </h1>
                <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
                  Protect your Eugene-Springfield home with comprehensive mold inspection, 
                  removal, and prevention services. Safe, thorough, and guaranteed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="tel:541-988-9823">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-xl font-bold fjalla-one active:scale-95 duration-200">
                      📞 Get Free Inspection
                    </button>
                  </Link>
                  <Link href="#services">
                    <button className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-2xl text-xl font-bold fjalla-one active:scale-95 duration-200">
                      Learn More
                    </button>
                  </Link>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span>✅ Licensed & Insured</span>
                  <span>✅ EPA Certified</span>
                  <span>✅ 25+ Years Experience</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-blue-600 w-full h-full absolute -top-[3%] -left-[3%] lg:-top-[2%] lg:-left-[2%] rounded-[45px] lg:rounded-[90px] -z-10"></div>
                <Image
                  className="rounded-[40px] lg:rounded-[75px] object-cover w-full h-96 lg:h-[500px] shadow-2xl"
                  src="/img/Mold-Remi.jpg"
                  alt="Professional mold remediation in Eugene Oregon"
                  width={600}
                  height={500}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-11/12 lg:max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl fjalla-one text-gray-900 mb-6">
                Why Eugene Trusts NorthWest HazMat
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Over 25 years of protecting Oregon families from mold-related health risks 
                with professional, thorough, and guaranteed remediation services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="bg-white rounded-[20px] p-8 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl fjalla-one text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="w-11/12 lg:max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl fjalla-one text-gray-900 mb-6">
                Comprehensive Mold Solutions
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                From initial inspection to long-term prevention, we provide complete 
                mold remediation services tailored to Oregon's unique climate challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {moldServices.map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-[25px] p-8 border-2 border-gray-200 hover:border-blue-300 transition-colors duration-300">
                  <div className="flex items-center mb-6">
                    <span className="text-4xl mr-4">{service.icon}</span>
                    <h3 className="text-2xl fjalla-one text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <span className="text-green-600 mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
          <div className="w-11/12 lg:max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl fjalla-one text-gray-900 mb-6">
                Our Proven Process
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Every mold remediation project follows our systematic, 
                EPA-compliant process to ensure safe and effective results.
              </p>
            </div>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold fjalla-one">
                    {step.step}
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl fjalla-one text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block w-full lg:w-px h-px lg:h-16 bg-blue-300 mx-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Oregon Climate Section */}
        <section className="py-20 bg-white">
          <div className="w-11/12 lg:max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-green-600 w-full h-full absolute -top-[3%] -right-[3%] lg:-top-[2%] lg:-right-[2%] rounded-[45px] lg:rounded-[90px] -z-10"></div>
                <Image
                  className="rounded-[40px] lg:rounded-[75px] object-cover w-full h-96 lg:h-[400px] shadow-2xl"
                  src="/img/Oregon_Rain.jpg"
                  alt="Oregon rainy climate creates mold challenges"
                  width={600}
                  height={400}
                />
              </div>
              
              <div>
                <h2 className="text-4xl lg:text-5xl fjalla-one text-gray-900 mb-6">
                  Oregon's Climate Challenge
                </h2>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Eugene-Springfield's wet climate creates perfect conditions for mold growth. 
                  With 8+ months of rain annually and high indoor humidity, Oregon homes need 
                  specialized mold prevention and remediation services.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 text-xl">🌧️</span>
                    <div>
                      <h4 className="font-bold text-gray-900">High Moisture Levels</h4>
                      <p className="text-gray-700">Oregon's long wet seasons keep indoor humidity above ideal levels</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 text-xl">🏠</span>
                    <div>
                      <h4 className="font-bold text-gray-900">Older Home Construction</h4>
                      <p className="text-gray-700">Many Eugene homes lack modern moisture barriers and ventilation</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3 text-xl">❄️</span>
                    <div>
                      <h4 className="font-bold text-gray-900">Temperature Fluctuations</h4>
                      <p className="text-gray-700">Seasonal changes create condensation in hidden areas</p>
                    </div>
                  </div>
                </div>

                <Link href="tel:541-988-9823">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-xl font-bold fjalla-one active:scale-95 duration-200">
                    Schedule Oregon-Specific Assessment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-11/12 lg:max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl fjalla-one text-gray-900 mb-6">
                What Our Clients Say
              </h2>
              <div className="flex justify-center text-yellow-500 text-2xl mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-[20px] p-8 shadow-lg border border-gray-200">
                  <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="w-11/12 lg:max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-6xl fjalla-one mb-8">
              Ready to Protect Your Home?
            </h2>
            <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Don't let mold compromise your family's health. Get a free inspection 
              and professional assessment from Eugene's most trusted mold experts.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-blue-700 rounded-[15px] p-6">
                <h4 className="font-bold text-lg mb-2">Free Inspection</h4>
                <p>Comprehensive visual assessment</p>
              </div>
              <div className="bg-blue-700 rounded-[15px] p-6">
                <h4 className="font-bold text-lg mb-2">Lab Testing</h4>
                <p>Professional air quality analysis</p>
              </div>
              <div className="bg-blue-700 rounded-[15px] p-6">
                <h4 className="font-bold text-lg mb-2">Safe Removal</h4>
                <p>EPA-compliant remediation</p>
              </div>
              <div className="bg-blue-700 rounded-[15px] p-6">
                <h4 className="font-bold text-lg mb-2">Prevention Plan</h4>
                <p>Long-term protection strategy</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="tel:541-988-9823">
                <button className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-5 rounded-2xl text-2xl font-bold fjalla-one active:scale-95 duration-200">
                  📞 Call: 541-988-9823
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-green-600 hover:bg-green-700 text-white border-2 border-green-600 px-10 py-5 rounded-2xl text-2xl font-bold fjalla-one active:scale-95 duration-200">
                  💬 Get Free Quote
                </button>
              </Link>
            </div>

            <div className="mt-8 text-blue-200">
              <p>📍 Serving Eugene, Springfield & All of Lane County</p>
              <p>🕒 Monday - Friday: 8AM - 6PM | Saturday: 8AM - 2PM</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}