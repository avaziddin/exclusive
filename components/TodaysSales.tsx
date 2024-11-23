import React, { ReactNode } from 'react';
import CountdownTimer from './Countdown';
import TodaysSalesProducts from './TodaysSalesProducts';
import Link from 'next/link';

interface TodaysSalesProps {
}

const TodaysSales: React.FC<TodaysSalesProps> = () => {
    return (
        <>
            <div className="w-full h-[50vh] mb-[300px] px-[7%]">
                <div className="flex gap-[10px] items-center ">
                    <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
                    <h1 className="text-[16px] font-semibold text-red-500">Today's</h1>
                </div>
                <div className="flex gap-[5%] mb-[20px] items-end">
                    <span className="text-[36px] font-semibold text-black">Flash Sales</span>
                    <CountdownTimer targetDate={"2024-12-25T00:00:00"} />
                </div>
                <TodaysSalesProducts  />
                <div className="flex justify-center">
                    <Link href="/">
                        <span className='p-[20px] rounded-lg text-[17px] font-medium px-[50px] bg-red-500'>
                            View All Products
                        </span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TodaysSales;