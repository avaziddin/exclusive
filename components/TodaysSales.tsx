import React, { ReactNode } from 'react';
import CountdownTimer from './Countdown';
import TodaysSalesProducts from './TodaysSalesProducts';
import Link from 'next/link';

interface TodaysSalesProps {
    translation:any
}

const TodaysSales: React.FC<TodaysSalesProps> = ({translation}) => {
    return (
        <>
            <div className="w-full mb-[50px]">
                <div className="flex gap-[10px] items-center ">
                    <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
                    <h1 className="text-[17px] font-semibold text-red-500">{translation.main.todays}</h1>
                </div>
                <div className="flex gap-[5%] mb-[40px] items-end">
                    <span className="text-[36px] font-semibold text-black">{translation.main.flash_sales}</span>
                    <CountdownTimer translation={translation} targetDate={"2024-12-25T00:00:00"} />
                </div>
                <TodaysSalesProducts  />
                <div className="flex border-b border-gray-300 pb-[70px] justify-center">
                    <Link href="/">
                        <span className='p-[20px] rounded-lg text-[17px] font-medium px-[50px] bg-red-500'>{translation.main.view}</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TodaysSales;