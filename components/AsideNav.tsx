"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AsideNav = ({ translation }: { translation: any }) => {
  const pathname = usePathname();
  
  // Split the pathname to remove the language prefix (e.g., '/en', '/ru')
  const pathWithoutLanguage = pathname.split('/').slice(2).join('/');

  // Logging for debugging
  console.log(pathWithoutLanguage);

  return (
    <aside className="flex flex-col gap-[3vh] mt-[10vh] w-[30%] text-black">
      <h1 className="xs:text-[20px] sm:text-[27px] whitespace-nowrap font-semibold">{translation.main.account.manage}</h1>
      <div className="flex xs:text-[18px] whitespace-nowrap sm:text-[20px] flex-col pl-[5%] gap-3 text-gray-400">
        <Link href="/change" className={pathWithoutLanguage === 'change' ? 'text-red-500' : 'text-gray-400'}>
          {translation.main.account.myprofile}
        </Link>
        <Link href="/adressBook" className={pathWithoutLanguage === 'adressBook' ? 'text-red-500' : 'text-gray-400'}>
          {translation.main.account.adressbook}
        </Link>
      </div>
    </aside>
  );
};

export default AsideNav;
