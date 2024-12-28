import HeaderNav from '@/components/HeaderNav';
import LanguageSwitcher from '@/components/LanguageSwitch';
import MyAcountModalCom from '@/components/MyAcountModal';
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
                <header className='text-white relative border-b border-gray-300'>
                    <div className=" py-[10px] px-[7%] w-full bg-black flex  justify-center">
                        <div className="flex">

                            <p className='text-center'>{translation.header.headerTitle}</p>
                            <LanguageSwitcher />
                        </div>
                    </div>
                    <div className=" bg-white w-full items-center flex justify-between  pt-[3%] pl-[7%] pr-[7%] pb-5">
                        <h1 className="text-black text-[26px] font-semibold">{translation.header.headerTitleSec}</h1>
                        <HeaderNav translation={translation} />

                        <div className="flex gap-[10px] items-center">
                            <div className="relative">
                                <input
                                    className="w-fit px-[15px] text-[17px] py-[7px] pr-10 rounded-[5px] outline-none bg-gray-200 text-black placeholder-gray-500 shadow-md focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                                    placeholder={translation.header.search}
                                    type="text"
                                />
                                <button
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-200"
                                    aria-label="Search"
                                >
                                    <Image src="/images/search.svg" alt="search" width={27} height={27} />
                                </button>
                            </div>

                            <div className="flex gap-[15px]">

                            <WishLIstHeaderButton/>
                                
                                <Image src="/images/cart.svg" alt="hello" width={35} height={30} />
                                <MyAcountModalCom translation={translation} />
                            </div>
                        </div>

                    </div>

                </header>
                <main className=' px-[7%]'>
                    {children}
                </main>
                <footer className="w-full bg-black flex justify-between text-white text-[17px] px-[7%] py-[2%]">

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
                        <input type="text" className="w-full border-solid border-2 border-white rounded-lg p-[10px] bg-black" placeholder={translation.footer.enter_email} />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link href="#">
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
                        <Link href="#">
                            {translation.footer.account}
                        </Link>
                        <Link href="#">
                            {translation.footer.my_account}
                        </Link>
                        <Link href="/login">
                            {translation.footer.log_in}
                        </Link>
                        <Link href="/cart">
                            {translation.footer.cart}
                        </Link>
                        <Link href="/wishlist">
                            {translation.footer.wishlist}
                        </Link>
                        <Link href="/shop">
                            {translation.footer.shop}
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Link href="#">
                            {translation.footer.quick_link}
                        </Link>
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


                    <div className="flex flex-col gap-4">
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