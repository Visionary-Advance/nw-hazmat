import Link from 'next/link';
import Image from 'next/image';

export default function HeaderLogo() {
  return (
    <Link href="/">
      <Image
        src="/img/NorthWest_HazMat_Logo_Small.png"
        alt="NorthWest Hazmat Logo"
        width={250}
        height={70}
        priority
      />
    </Link>
  );
}
