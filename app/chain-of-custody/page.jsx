// app/chain-of-custody/page.jsx
import Breadcrumbs from '@/Components/BreadCrumbs';

export const metadata = {
  title: 'Chain of Custody Form | NorthWest HazMat Oregon',
  description: 'Download our Chain of Custody form for hazmat samples. Comprehensive sample tracking for asbestos, mold, and lead testing in Oregon. Call 541-988-9823.',
  keywords: 'chain of custody, sample tracking, hazmat testing, asbestos testing, mold testing, lead testing, Oregon environmental services',
  alternates: {
    canonical: 'https://nwhazmat.com/chain-of-custody',
  },
  openGraph: {
    title: 'Chain of Custody Form | NorthWest HazMat',
    description: 'Download our Chain of Custody form for hazmat sample tracking and documentation.',
    url: 'https://nwhazmat.com/chain-of-custody',
    siteName: 'NorthWest HazMat, Inc.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://nwhazmat.com/img/Hazmat-Services.jpg',
        width: 1200,
        height: 630,
        alt: 'NorthWest HazMat Chain of Custody form',
      },
    ],
  },
};

export default function ChainOfCustodyPage() {
  return (
    <>
      <Breadcrumbs />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold fjalla-one mb-4 text-center">
            Chain of Custody Form
          </h1>
          <p className="text-center text-gray-600 mb-6">
            View, fill out, and print our Chain of Custody form below
          </p>
          
          {/* Download button */}
          <div className="text-center mb-4">
            <a 
              href="/files/Chain_Of_Custody.pdf" 
              download
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold inline-block"
            >
              Download PDF Form
            </a>
          </div>

          {/* PDF Viewer */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="/files/Chain_Of_Custody.pdf"
              className="w-full h-screen border-0"
              title="Chain of Custody Form"
            />
          </div>

          {/* Instructions */}
          

          {/* Contact info */}
          <div className="mt-6 text-center text-gray-600">
            <p>Questions? Call us at <a href="tel:541-988-9823" className="text-blue-600 font-semibold">541-988-9823</a></p>
          </div>
        </div>
      </div>
    </>
  );
}