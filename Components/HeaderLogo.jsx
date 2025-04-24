
import Link from 'next/link';

export default function HeaderLogo() {
  return (
    <Link href="/">
      <img 
        src="/img/NorthWest_HazMat_Logo_Small.png" 
        alt="NorthWest Hazmat Logo" 
        width={250} 
        height={70} 
       
      />
    </Link>
  );
}
