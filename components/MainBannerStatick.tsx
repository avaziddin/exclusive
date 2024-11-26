import Image from 'next/image';
import React, { ReactNode } from 'react';
import CountdownTimerSec from './CountdownSec';

interface MainBannerStatickProps {
    translation: any
}

const MainBannerStatick: React.FC<MainBannerStatickProps> = ({ translation }) => {
    return (
        <>
            <div className="w-full flex justify-between pt-[2%] pb-[2%] px-[4%] bg-black text-white mb-[100px]">
                <div className="pt-[1%]">
                    <span className="text-[18px] font-bold text-green-500 ">Categories</span>
                    <h1 className="text-[48px] mb-[10%] leading-tight pt-[30px]">
                        Enhance Your <br /> Music Experience
                    </h1>
                    <CountdownTimerSec translation={translation} targetDate="2024-12-25T00:00:00" />
                    <button className="mt-[10%] px-[40px] py-[15px] bg-green-500 text-white font-bold rounded hover:bg-green-600 transition">
                        Buy now
                    </button>
                </div>

                <div className="relative w-[40%] mr-[5%]">
                    <div className="absolute inset-0 bg-gradient-to-r from-white rounded-[50%] to-transparent opacity-70 blur-xl z-0"></div>

                    <Image className="relative z-10 w-full object-cover" src="/images/jblimg.svg" alt="jbl" width={1000} height={1000}/>
                </div>
            </div>

        </>
    );
};

export default MainBannerStatick;