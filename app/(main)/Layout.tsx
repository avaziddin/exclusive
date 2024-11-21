import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <header className='text-white relative border-b border-gray-300'>
                <div className="py-[10px] px-[7%] w-full bg-black flex  justify-center">
                    <div className="flex">

                        <p className='text-center'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
                        <select className='absolute right-[6%] bg-black bg-none border-none outline-none'>
                            <option className='p-[5px] border-none' value="">Русский</option>
                            <option className='p-[5px] border-none' value="">English</option>
                        </select>

                    </div>
                </div>
                <div className="w-full items-center flex justify-between pt-[3%] pl-[7%] pr-[9%] pb-5">
                    <h1 className="text-black text-[26px] font-semibold">Exclusive</h1>
                    <div className="text-[17px] text-black flex gap-10">
                        <Link className='text-[18px] pb-0 active:border-b border-black' href="/">Home</Link>
                        <Link className='text-[18px] pb-0 active:border-b border-black' href="/">Contact</Link>
                        <Link className='text-[18px] pb-0 active:border-b border-black' href="/">About</Link>
                        <Link className='text-[18px] pb-0 active:border-b border-black' href="/">Sign Up</Link>
                    </div>

                    <div className="flex gap-[5%]">


                        <div className="relative">
                            <input
                                className="w-fit px-[15px] text-[17px] py-[7px] pr-10 rounded-[5px] outline-none bg-gray-200 text-black placeholder-gray-500 shadow-md focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                                placeholder="What are you looking for?"
                                type="text"
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-200"
                                aria-label="Search"
                            >
                                <Image src="/images/search.svg" alt="search" width={27} height={27} />
                            </button>
                        </div>

                        <Image src="/images/favourite.svg" alt="hello" width={32} height={30} />
                        <Image src="/images/cart.svg" alt="hello" width={32} height={30} />
                    </div>
                </div>
            </header>
            {children}
            <footer>footer</footer>
        </>
    );
};

export default Layout;