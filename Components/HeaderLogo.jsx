import Image from 'next/image';
import Link from 'next/link';

export default function HeaderLogo() {
  return (
    <Link href="/">
      <Image 
        src="/Img/NorthWest-Hazmat-Logo.png" 
        alt="NorthWest Hazmat Logo" 
        width={250} 
        height={70} 
        priority
      />
    </Link>
  );
}
