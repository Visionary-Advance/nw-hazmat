import ApplicationClient from './ApplicationClient';

export const metadata = {
  title: 'Hazmat Careers & Employment Application | NorthWest HazMat',
  description:
    'Apply for hazmat and environmental cleanup jobs at NorthWest HazMat in Eugene & Lane County, Oregon. Submit your application and resume online. HAZWOPER-certified roles available.',
  alternates: {
    canonical: 'https://nwhazmat.com/employment-application',
  },
  openGraph: {
    title: 'Hazmat Careers & Employment Application | NorthWest HazMat',
    description:
      'Apply for hazmat and environmental cleanup jobs at NorthWest HazMat in Eugene & Lane County, Oregon. Submit your application and resume online.',
    url: 'https://nwhazmat.com/employment-application',
    siteName: 'NorthWest HazMat, Inc.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function EmploymentApplicationPage() {
  return <ApplicationClient />;
}
