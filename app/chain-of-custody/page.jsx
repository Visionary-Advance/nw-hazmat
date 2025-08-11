// app/chain-of-custody/page.jsx
import ChainOfCustodyForm from '@/Components/ChainOfCustodyForm';
import Breadcrumbs from '@/Components/BreadCrumbs';

export const metadata = {
  title: 'Chain of Custody Form | NorthWest HazMat Oregon',
  description: 'Fill out and generate a professional Chain of Custody form for hazmat samples. NorthWest HazMat provides comprehensive sample tracking documentation for asbestos, mold, and lead testing in Oregon.',
  keywords: 'chain of custody, sample tracking, hazmat testing, asbestos testing, mold testing, lead testing, Oregon environmental services',
  openGraph: {
    title: 'Chain of Custody Form | NorthWest HazMat',
    description: 'Professional Chain of Custody form for hazmat sample tracking and documentation.',
    type: 'website',
  },
};

export default function ChainOfCustodyPage() {
  return (
    <>
      <Breadcrumbs />
      <div className="container mx-auto py-8 px-4">
        <ChainOfCustodyForm />
      </div>
    </>
  );
}