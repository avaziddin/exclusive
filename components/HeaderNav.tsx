"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderNav = ({ translation }: { translation: any }) => {

  const pathname = usePathname()
  const pathWithoutLanguage = pathname.split('/').slice(2).join('/');

  console.log(pathWithoutLanguage);
  
  

  return (
    <div className="text-[17px] text-black flex gap-10">
      <Link
        className={`text-[18px] pb-0 border-black ${pathWithoutLanguage === '' ? 'border-b' : ''}`}
        href="/"
      >
        {translation.header.nav.home}
      </Link>
      <Link
        className={`text-[18px] pb-0 border-black ${pathWithoutLanguage === 'contact' ? 'border-b' : ''}`}
        href="/contact"
      >
        {translation.header.nav.contact}
      </Link>
      <Link
        className={`text-[18px] pb-0 border-black ${pathWithoutLanguage === 'about' ? 'border-b' : ''}`}
        href="/about"
      >
        {translation.header.nav.about}
      </Link>
      <Link
        className={`text-[18px] pb-0 border-black ${pathWithoutLanguage === 'sign-up' ? 'border-b' : ''}`}
        href="/sign-up"
      >
        {translation.header.nav.sing_up}
      </Link>
    </div>
  );
};

export default HeaderNav;
