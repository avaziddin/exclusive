import Link from 'next/link';
import React, { ReactNode } from 'react';
import Slider from './Corusel';

interface BannerProps {
    item: any
    lang:any
}

const MainBanner: React.FC<BannerProps> = ({item, lang}) => {

    return (
        <>
            <div className="w-full flex mb-[100px] gap-[1%]">
                <div className="flex overflow-hidden scrollbar-hidden h-[50vh] overflow-y-auto flex-col w-[19%] mt-[2%] gap-[15px] text-[17px] text-black">
                    <Link key={item._id} className='py-[5px] text-[18px] px-[5px] rounded-b-none rounded-[5px] active:bg-gray-100 transition-[.2s]' href={"/"}>{item.titles[lang]}</Link>
                </div>
                <div className=" border-l-[2px] h-fit w-[80%] pl-[2%] pt-[2%]">
                    <Slider></Slider>
                </div>
            </div>
        </>
    );
};

export default MainBanner;