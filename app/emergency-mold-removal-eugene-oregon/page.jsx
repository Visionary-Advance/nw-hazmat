import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/Components/BreadCrumbs';

export const metadata = {
  title: "Emergency Black Mold Removal Eugene Oregon | 24/7 Response",
  description: "24/7 emergency black mold removal in Eugene-Springfield, Oregon. Toxic Stachybotrys response team. Licensed, certified, 25+ years experience. Call 1-800-597-1323 NOW!",
  keywords: "emergency mold removal eugene, black mold removal eugene oregon, toxic mold emergency springfield, 24/7 mold response lane county, stachybotrys removal oregon",
  openGraph: {
    title: "Emergency Black Mold Removal | 24/7 Eugene Oregon Response",
    description: "Immediate response for toxic black mold contamination in Eugene-Springfield. Professional emergency remediation. Call 1-800-597-1323.",
    url: "https://nwhazmat.com/emergency-mold-removal-eugene-oregon",
    siteName: "NorthWest HazMat, Inc.",
    type: "website",
    images: [
      {
        url: "https://nwhazmat.com/img/Mold-Remi.jpg",
        width: 1200,
        height: 630,
        alt: "Emergency black mold removal Eugene Oregon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Black Mold Removal | 24/7 Eugene Oregon",
    description: "Immediate response for toxic black mold. Call 1-800-597-1323 NOW!",
    images: ["https://nwhazmat.com/img/Mold-Remi.jpg"],
  },
};

export default function BlackMoldSingleColumn() {
  const responseAreas = [
    { area: "University of Oregon", time: "8 minutes" },
    { area: "Downtown Eugene", time: "12 minutes" },
    { area: "Springfield", time: "5 minutes" },
    { area: "West Eugene", time: "15 minutes" },
    { area: "South Eugene", time: "14 minutes" },
    { area: "Coburg/River Road", time: "10 minutes" }
  ];

  const emergencySymptoms = [
    "Severe breathing difficulty",
    "Chest pain or tightness", 
    "Persistent coughing with blood",
    "Severe allergic reactions",
    "Disorientation or memory problems"
  ];

  const seriousSymptoms = [
    "Persistent cough and throat irritation",
    "Severe headaches and fatigue",
    "Skin rashes and irritation",
    "Eye irritation and excessive tearing",
    "Worsening asthma or respiratory issues"
  ];

  const immediateActions = [
    "EVACUATE THE AREA IMMEDIATELY - Do not stay in contaminated space",
    "DO NOT TOUCH OR DISTURB - This releases more toxic spores",
    "SEAL OFF THE AREA - Close doors, turn off fans/HVAC",
    "REMOVE CONTAMINATED CLOTHING - Wash immediately or discard", 
    "CALL EMERGENCY LINE NOW - Professional assessment required",
    "SEEK MEDICAL ATTENTION - If experiencing any symptoms"
  ];

  return (
    <>
      
      
      {/* Full-Width Hero Section */}
      <div className="w-full min-h-screen bg-gradient-to-b from-red-600 via-red-700 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative flex flex-col justify-center items-center min-h-screen text-center px-4">
          <div className="w-full max-w-4xl">
            <h1 className="text-6xl lg:text-9xl fjalla-one font-bold mb-8 animate-pulse">
              BLACK MOLD
            </h1>
            <h2 className="text-3xl lg:text-5xl fjalla-one mb-8 text-yellow-300">
              EMERGENCY RESPONSE
            </h2>
            <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Eugene & Springfield's immediate response team for toxic Stachybotrys mold contamination. 
              Your health and safety are our top priority.
            </p>
            <Link href="tel:1-800-597-1323">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-12 py-6 rounded-[30px] text-3xl font-bold fjalla-one active:scale-95 duration-200 shadow-2xl mb-8">
                📞 CALL NOW: 1-800-597-1323
              </button>
            </Link>
            <p className="text-lg text-red-200">
              24/7 Emergency Response • Licensed & Certified • 25+ Years Experience
            </p>
          </div>
        </div>
      </div>

      {/* Flowing Content Sections */}
      <div className="w-full">
        
        {/* Danger Warning Section */}
        <section className="w-full bg-black text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-6xl fjalla-one mb-8 text-red-400">
              ⚠️ HEALTH DANGER ALERT
            </h2>
            <div className="bg-red-600 border-4 border-yellow-400 rounded-[25px] p-8 mb-8">
              <p className="text-2xl lg:text-3xl font-bold mb-4">
                BLACK MOLD IS TOXIC
              </p>
              <p className="text-xl">
                Stachybotrys produces mycotoxins that can cause serious health problems. 
                DO NOT attempt removal yourself. Professional remediation required immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Symptoms Section */}
        <section className="w-full bg-white py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl lg:text-6xl fjalla-one text-center mb-16 text-gray-900">
              🚨 RECOGNIZE THE SYMPTOMS
            </h2>
            
            {/* Critical Symptoms */}
            <div className="mb-16">
              <div className="bg-red-50 border-l-8 border-red-600 p-8 rounded-[15px] mb-8">
                <h3 className="text-3xl fjalla-one text-red-800 mb-6">
                  💀 CALL 911 IMMEDIATELY
                </h3>
                <div className="space-y-4">
                  {emergencySymptoms.map((symptom, index) => (
                    <div key={index} className="flex items-center p-4 bg-white rounded-[10px] shadow-sm">
                      <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">!</span>
                      <span className="text-lg font-semibold text-red-800">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Serious Symptoms */}
            <div className="mb-16">
              <div className="bg-orange-50 border-l-8 border-orange-500 p-8 rounded-[15px]">
                <h3 className="text-3xl fjalla-one text-orange-800 mb-6">
                  ⚠️ EVACUATE AREA & CALL US
                </h3>
                <div className="space-y-4">
                  {seriousSymptoms.map((symptom, index) => (
                    <div key={index} className="flex items-center p-4 bg-white rounded-[10px] shadow-sm">
                      <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">!</span>
                      <span className="text-lg text-orange-800">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Steps Section */}
        <section className="w-full bg-gray-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl lg:text-6xl fjalla-one text-center mb-16 text-yellow-400">
              📋 EMERGENCY PROTOCOL
            </h2>
            <div className="space-y-8">
              {immediateActions.map((action, index) => (
                <div key={index} className="flex items-start p-8 bg-gray-800 rounded-[20px] border-l-4 border-yellow-400">
                  <span className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-yellow-300">
                      {action.split(' - ')[0]}
                    </h4>
                    <p className="text-lg text-gray-300">
                      {action.split(' - ')[1] || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Response Times Section */}
        <section className="w-full bg-green-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-6xl fjalla-one mb-16">
              ⚡ RESPONSE TIMES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {responseAreas.map((area, index) => (
                <div key={index} className="bg-green-700 rounded-[20px] p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">{area.area}</h3>
                  <p className="text-4xl font-bold">{area.time}</p>
                </div>
              ))}
            </div>
            <p className="text-2xl font-bold">
              🚨 TEAM DISPATCHED WITHIN 2 MINUTES
            </p>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="w-full bg-white py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl lg:text-6xl fjalla-one text-center mb-16 text-gray-900">
              🏠 WHERE WE RESPOND
            </h2>
            
            <div className="space-y-12">
              <div className="bg-purple-50 border-l-8 border-purple-600 p-8 rounded-[15px]">
                <h3 className="text-2xl fjalla-one text-purple-800 mb-6">Eugene Contamination Areas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p><strong>Basements</strong> - Oregon's wet climate</p>
                    <p><strong>Bathrooms</strong> - Poor ventilation</p>
                    <p><strong>Behind walls</strong> - Hidden leaks</p>
                  </div>
                  <div className="space-y-2">
                    <p><strong>Attics</strong> - Roof leaks, condensation</p>
                    <p><strong>Crawlspaces</strong> - Moisture accumulation</p>
                    <p><strong>Around windows</strong> - Condensation issues</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-8 border-blue-600 p-8 rounded-[15px]">
                <h3 className="text-2xl fjalla-one text-blue-800 mb-6">University Housing Emergency</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p><strong>Dormitory rooms</strong> - Poor ventilation</p>
                    <p><strong>Greek houses</strong> - Older buildings</p>
                    <p><strong>Off-campus apartments</strong> - Maintenance issues</p>
                  </div>
                  <div className="space-y-2">
                    <p><strong>Student co-ops</strong> - Moisture problems</p>
                    <p><strong>Research facilities</strong> - Chemical exposure + moisture</p>
                  </div>
                </div>
                <p className="text-blue-700 font-semibold mt-4">
                  🎓 Student Safety Priority: We coordinate with UO Health Center
                </p>
              </div>

              <div className="bg-cyan-50 border-l-8 border-cyan-600 p-8 rounded-[15px]">
                <h3 className="text-2xl fjalla-one text-cyan-800 mb-6">Black Mold Identification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p><strong>Dark green/black color</strong></p>
                    <p><strong>Slimy or wet appearance</strong></p>
                    <p><strong>Strong musty odor</strong></p>
                  </div>
                  <div className="space-y-2">
                    <p><strong>Grows in patches</strong></p>
                    <p><strong>Often hidden behind surfaces</strong></p>
                    <p><strong>Thrives on organic materials</strong></p>
                  </div>
                </div>
                <p className="text-red-600 font-semibold mt-4">
                  ⚠️ Professional testing required for confirmation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full bg-gradient-to-b from-red-600 to-black text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl lg:text-6xl fjalla-one mb-8">
              🚨 EMERGENCY PROTOCOL ACTIVATED
            </h2>
            <p className="text-xl lg:text-2xl mb-12 leading-relaxed">
              Black mold emergencies require immediate professional intervention. Our certified 
              Stachybotrys remediation team uses advanced containment and removal techniques to protect your health.
            </p>
            
            <div className="space-y-6">
              <Link href="tel:1-800-597-1323">
                <button className="w-full max-w-md bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-6 rounded-[25px] text-2xl font-bold fjalla-one active:scale-95 duration-200 shadow-2xl">
                  🚨 EMERGENCY: 1-800-597-1323
                </button>
              </Link>
              <Link href="tel:541-988-9823">
                <button className="w-full max-w-md bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-600 px-8 py-6 rounded-[25px] text-2xl font-bold fjalla-one active:scale-95 duration-200 shadow-2xl">
                  📞 NON-EMERGENCY: 541-988-9823
                </button>
              </Link>
            </div>

            <div className="mt-12 bg-black bg-opacity-50 rounded-[20px] p-8">
              <h3 className="text-2xl fjalla-one mb-4">Eugene Medical Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="font-bold">🏥 PeaceHealth Sacred Heart</p>
                  <p>Emergency mold exposure treatment</p>
                  <p className="text-gray-300">1255 Hilyard St, Eugene</p>
                </div>
                <div>
                  <p className="font-bold">🎓 University Health Center</p>
                  <p>Student mold exposure care</p>
                  <p className="text-gray-300">UO Campus</p>
                </div>
                <div>
                  <p className="font-bold">📞 Oregon Poison Center</p>
                  <p>Mold toxicity consultation</p>
                  <p className="text-gray-300">1-800-222-1222</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}