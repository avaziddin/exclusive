
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface BannerProps {
    children: ReactNode;
}

const MainBanner: React.FC<BannerProps> = ({ children }) => {

    return (
        <>
            <div className="w-full flex px-[7%] gap-[1%]">
                <div className="flex overflow-hidden scrollbar-hidden h-[55vh] overflow-y-auto flex-col w-[19%] pt-[2%] gap-[15px] text-[17px] text-black">
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                    <Link className='hover:bg-gray-100 py-[5px] px-[5px] rounded-[5px] active:scale-[.9] transition-[.2s]' href={"/"}>Woman’s Fashion</Link>
                </div>
                <div className=" border-l-[2px] w-[80%] pl-[2%] pt-[2%]">
                    <Image className='w-full cover' src="/images/banner.svg" alt="banner" width={800}
                        height={400} />
                </div>
            </div>
        </>
    );
};

export default MainBanner;