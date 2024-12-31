"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderNav = ({ translation }: { translation: any }) => {

  const pathname = usePathname()
  const pathWithoutLanguage = pathname.split('/').slice(2).join('/');

  console.log(pathWithoutLanguage);
  
  

  return (
    <div className="justify-center  xs:hidden sm:flex  sm:text-[10px] lg:text-[17px] sm:w-[50%] lg:w-fit lg:gap-[5%]  md:gap-[5%] sm:gap-[5%]  md:w-[50%] text-black flex  whitespace-nowrap xl:gap-[10%] ">
      <Link
        className={`sm:text-[13px]  lg:text-[17px] xl:text-[18px] pb-0 border-black ${pathWithoutLanguage === '' ? 'border-b' : ''}`}
        href="/"
      >
        {translation.header.nav.home}
      </Link>
      <Link
        className={`sm:text-[13px]  lg:text-[17px] xl:text-[18px] pb-0 border-black ${pathWithoutLanguage === 'contact' ? 'border-b' : ''}`}
        href="/contact"
      >
        {translation.header.nav.contact}
      </Link>
      <Link
        className={`sm:text-[13px]  lg:text-[17px] xl:text-[18px] pb-0 border-black ${pathWithoutLanguage === 'about' ? 'border-b' : ''}`}
        href="/about"
      >
        {translation.header.nav.about}
      </Link>
      <Link
        className={`sm:text-[13px] lg:text-[17px] xl:text-[18px] pb-0 border-black ${pathWithoutLanguage === 'sign_in' ? 'border-b' : ''}`}
        href="/sign_in"
      >
        {translation.header.nav.sing_up}
      </Link>
    </div>
  );
};

export default HeaderNav;
