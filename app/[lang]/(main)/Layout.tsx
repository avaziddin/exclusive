import CartHeaderButton from '@/components/CartHeaderButton';
import HeaderNav from '@/components/HeaderNav';
import LanguageSwitcher from '@/components/LanguageSwitch';
import MyAcountModalCom from '@/components/MyAcountModal';
import Search from '@/components/Search';
import WishLIstHeaderButton from '@/components/WishLIstHeaderButton';
import { AppWrapper } from '@/context';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    translation: any
    lang: any;
}

const Layout: React.FC<LayoutProps> = async ({ children, translation, lang }) => {

    return (
        <>
            <AppWrapper>
                <header className=' text-white relative border-b border-gray-300'>

                    <div className="xs:bg-white items-center sm:bg-black py-[10px] xl:px-[7%] w-full bg-black flex  justify-center">
                        <div className="flex">

                            <p className='xs:hidden sm:text-[14px] sm:px-[80px] sm:block text-center'>{translation.header.headerTitle}</p>
                            <LanguageSwitcher />
                        </div>
                    </div>
                    <div className="xs:pb-[2px]  sm:px-[7%] xs:px-[4px] bg-white w-full items-center flex justify-between  pt-[3%] lg:pl-[7%] lg:pr-[7%] lg:pb-5">
                        <h1 className="xs:hidden lg:block text-black lg:text-[26px] font-semibold">{translation.header.headerTitleSec}</h1>

                        <HeaderNav translation={translation} />

                        <div className="flex xs:justify-between  sm:justify-end xs:w-full  lg:w-[30%]  gap-[10px] items-center">

                            <Search translation={translation} lang={lang} />


                            <div className="flex xs:gap-[5px] xl:gap-[10px]">

                                <WishLIstHeaderButton />

                                <CartHeaderButton />
                                <MyAcountModalCom translation={translation} />
                            </div>
                        </div>

                    </div>

                </header>
                <main className='xs:px-[10px] sm:px-[7%] px-[7%]'>
                    {children}
                </main>
                <footer className="w-full bg-black xs:flex-col md:flex-row md:flex md:p-[5%] xs:gap-[10px] lg:flex justify-between text-white xs:text-[10px] sm:text-[12px] lg:text-[15px] xl:text-[17px] px-[7%] py-[2%]">

                    <div className="flex flex-col gap-4">
                        <Link href="#">
                            {translation.header.headerTitleSec}
                        </Link>
                        <Link href="#">
                            {translation.footer.subscribe}
                        </Link>
                        <Link href="#">
                            {translation.footer.sale}
                        </Link>
                        {/*                         <input type="text" className="w-full border-solid border-2 border-white rounded-lg p-[10px] bg-black" placeholder={translation.footer.enter_email} />
 */}                    </div>

                    <div className="flex flex-col gap-4">
                        <Link href="/adressBook">
                            {translation.footer.support}
                        </Link>
                        <Link href="#">
                            {translation.footer.adress}
                        </Link>
                        <Link href="mailto:ibadovunus55@gmail.com">
                            ibadovunus55@gmail.com
                        </Link>
                        <Link href="tel:+9989094450043">
                            +998(90)-445-00-43
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link href="/change">
                            {translation.footer.account}
                        </Link>
                        <Link href="#">
                            {translation.footer.my_account}
                        </Link>
                        <Link href="/sign_in">
                            {translation.footer.log_in}
                        </Link>
                        <Link href="/cart">
                            {translation.footer.cart}
                        </Link>
                        <Link href="/wishlist">
                            {translation.footer.wishlist}
                        </Link>
                        <Link href="/">
                            {translation.footer.shop}
                        </Link>
                    </div>

                    <div className="flex xs:hidden sm:flex flex-col gap-4">
                        <Link href="/privacy-policy">
                            {translation.footer.privacy_policy}
                        </Link>
                        <Link href="/terms-of-use">
                            {translation.footer.terms}
                        </Link>
                        <Link href="/faq">
                            {translation.footer.FAQ}
                        </Link>
                        <Link href="/contact">
                            {translation.footer.contact}
                        </Link>
                    </div>


                    <div className="flex xs:hidden sm:flex flex-col gap-4">
                        <span>{translation.footer.dowload_app}</span>
                        <p className="text-gray-400">{translation.footer.save}</p>

                        <div className="flex gap-3">
                            <Image src="/images/code.svg" alt="hello" width={90} height={30} />
                            <div className="flex flex-col gap-3">
                                <Image src="/images/google.svg" alt="hello" width={115} height={30} />
                                <Image src="/images/ayfon.svg" alt="hello" width={115} height={30} />
                            </div>
                        </div>

                        <div className="flex gap-8">
                            <Image src="/images/facebook.svg" alt="hello" width={28} height={30} />
                            <Image src="/images/ttt.svg" alt="hello" width={28} height={30} />
                            <Image src="/images/instagram.svg" alt="hello" width={28} height={30} />
                            <Image src="/images/vvv.svg" alt="hello" width={28} height={30} />
                        </div>
                    </div>

                </footer>
            </AppWrapper>
        </>
    );
};

export default Layout;