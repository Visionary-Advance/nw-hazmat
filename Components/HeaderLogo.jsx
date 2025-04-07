
import Link from 'next/link';

export default function HeaderLogo() {
  return (
    <Link href="/">
      <img 
        src="/img/NorthWest-HazMat-Logo.png" 
        alt="NorthWest Hazmat Logo" 
        width={250} 
        height={70} 
       
      />
    </Link>
  );
}
