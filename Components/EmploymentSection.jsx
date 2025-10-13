import Link from 'next/link';
import Image from 'next/image';

export default function EmploymentSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 -z-10"></div>
      <Image
        src="/img/Trucks.jpg"
        alt="Join Our Team"
        fill
        className="object-cover opacity-30 -z-20"
      />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-white">
            <h2 className="text-5xl lg:text-6xl fjalla-one mb-6">
              Join Our Team
            </h2>
            <p className="text-xl lg:text-2xl mb-8 leading-relaxed">
              NorthWest HazMat is always looking for dedicated professionals to join our growing team. 
              We offer competitive pay, comprehensive training, and a commitment to safety excellence.
            </p>

            {/* Benefits Grid */}
          
            <Link href="/employment-application">
              <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full text-xl font-bold fjalla-one active:scale-95 duration-200 shadow-xl">
                Apply Now →
              </button>
            </Link>
          </div>

          {/* Image/Stats Side */}
          <div className="relative">
            <div className="bg-red-600 w-full h-full absolute -top-[3%] -right-[3%] lg:-top-[2%] lg:-right-[2%] rounded-[45px] lg:rounded-[90px] -z-10"></div>
            <div className="bg-white rounded-[40px] lg:rounded-[75px] p-8 shadow-2xl">
              
              <h3 className="text-3xl fjalla-one text-gray-900 mb-6 text-center">
                Why Work With Us?
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">25+ Years in Business</h4>
                    <p className="text-gray-700">Established, stable company with a proven track record</p>
                  </div>
                </div>

                

                <div className="flex items-start">
                  <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Community Focused</h4>
                    <p className="text-gray-700">Serving Lane County and the Pacific Northwest</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Career Growth</h4>
                    <p className="text-gray-700">Opportunities for advancement and skill development</p>
                  </div>
                </div>

               


                <div className="flex items-start">
                  <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Meaningful Work</h4>
                    <p className="text-gray-700">Protect communities and the environment every day</p>
                  </div>
                </div>
              </div>

             
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}