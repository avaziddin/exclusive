import LanguageSwitcher from '@/components/LanguageSwitch';
import Link from '@/node_modules/next/link';
import Image from 'next/image';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  translation: any
}

const Layout: React.FC<LayoutProps> = ({ children, translation }) => {
  return (
    <>
  
      <header className="w-full">
        <div className="bg-black px-20 py-2 w-full h-[48px] flex items-center justify-center text-[16px]">
          <div>
            <span className="text-black">1</span>
          </div>

          <div className="flex gap-5">
            <span className="text-gray-100">{translation.header.headerTitle}</span>
            <span className="underline decoration-1 text-white">ShopNow</span>
          </div>

         <LanguageSwitcher/>
        </div>

        {/* Navigation Section */}
        <div className="w-full flex justify-between pt-12 px-20 pb-5">
          <h1 className="text-black text-[25px] font-bold">Exclusive</h1>

          <div className="text-[17px] text-black flex gap-10">
            <Link href='/'>
            <span>{translation.header.nav.home}</span>
            </Link>
            <Link href='/contact'>
            <span>{translation.header.nav.contact}</span>
            </Link>
            <Link href='/about'>
            <span>{translation.header.nav.about}</span>
            </Link>
            <Link href='/sign_up'>
            <span>{translation.header.nav.sing_up}</span>
            </Link>
          </div>

          <div className="flex gap-5">
            <input
              className="w-[243px] h-[38px] p-5 rounded-lg outline-none bg-gray-200"
              placeholder={translation.header.search}
              type="text"
            />
            <div className="flex gap-5">
              <Link href='/wishlist'>
              <Image src="/images/like.svg" alt="Like Icon" width={32} height={30} />
              </Link>
              <Image src="/images/corzina.svg" alt="Cart Icon" width={32} height={30} />
            </div>
          </div>
        </div>
      </header>

      <hr className="bg-gray-400 w-full" />

      
      {children}

      {/* Footer Section */}
      <footer className="h-[440px] w-full bg-black flex justify-between mt-20 text-white text-[20px] p-20">
        <div className="flex flex-col gap-4">
          <span>Exclusive</span>
          <span>{translation.footer.subscribe}</span>
          <span>{translation.footer.sale}</span>
          <input
            type="text"
            className="w-[217px] h-[48px] border-solid border-2 border-white rounded-lg p-5 bg-black"
            placeholder={translation.footer.enter_email}
          />
        </div>

        <div className="flex flex-col gap-4">
          <span>{translation.footer.support}</span>
          <span>{translation.footer.adress}</span>
          <span>exclusive@gmail.com</span>
          <span>+88015-88888-9999</span>
        </div>

        <div className="flex flex-col gap-4">
          <span>{translation.footer.account}</span>
          <span>{translation.footer.my_account}</span>
          <span>{translation.footer.log_in}</span>
          <span>{translation.footer.cart}</span>
          <span>{translation.footer.wishlist}</span>
          <span>{translation.footer.shop}</span>
        </div>

        <div className="flex flex-col gap-4">
          <span>{translation.footer.quick_link}</span>
          <span>{translation.footer.privacy_policy}</span>
          <span>{translation.footer.terms}</span>
          <span>{translation.footer.faq}</span>
          <span>{translation.footer.contact}</span>
        </div>

        <div className="flex flex-col gap-4">
          <span>{translation.footer.download_app}</span>
          <p className="text-gray-400">{translation.footer.save}</p>
          <div className="flex gap-3">
            <Image src="/images/code.svg" alt="QR Code" width={90} height={30} />
            <div className="flex flex-col gap-3">
              <Image src="/images/google.svg" alt="Google Play Store" width={115} height={30} />
              <Image src="/images/iphone.svg" alt="Apple App Store" width={115} height={30} />
            </div>
          </div>
          <div className="flex gap-8">
            <Image src="/images/facebook.svg" alt="Facebook" width={28} height={30} />
            <Image src="/images/twitter.svg" alt="Twitter" width={28} height={30} />
            <Image src="/images/instagram.svg" alt="Instagram" width={28} height={30} />
            <Image src="/images/youtube.svg" alt="YouTube" width={28} height={30} />
          </div>
        </div>
      </footer>
    
    </>
  );
};

export default Layout;