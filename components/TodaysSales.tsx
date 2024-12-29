"use client"

import React, { ReactNode, useEffect, useState } from 'react';
import CountdownTimer from './Countdown';
import TodaysSalesProducts from './TodaysSalesProducts';
import Link from 'next/link';
import { useAppContext } from '@/context';

interface TodaysSalesProps {
    translation: any
    lang: any
}



const TodaysSales: React.FC<TodaysSalesProps> = ({ translation, lang }) => {
    const { count } = useAppContext()
    const [timer, setTimer] = useState<string | null>(null);
    const [timeOver, setTimeOver] = useState(true)

    useEffect(() => {
        if (count.length > 0) {
            const latestCountdown = count[0]?.countdown;
            setTimer(latestCountdown || null);
        }
    }, [count]);

    useEffect(() => {
        if (timer && !isNaN(new Date(timer).getTime())) {
            const now = new Date();
            const timeDifference = new Date(timer).getTime() - now.getTime();
            console.log("Time difference:", timeDifference);

            timeDifference < 0 ? setTimeOver(true) : setTimeOver(false)
        }
    }, [timer]);

    return (
        <>

            {!timeOver &&
                <div className="w-full mb-[50px]">
                    <div className="flex gap-[10px] items-center ">
                        <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
                        <h1 className="text-[17px] font-semibold text-red-500">{translation.main.todays}</h1>
                    </div>
                    <div className="flex gap-[5%] mb-[40px] items-end">
                        <span className="text-[36px] font-semibold text-black">{translation.main.flash_sales}</span>

                        {timer && !isNaN(new Date(timer).getTime()) ? (
                            <CountdownTimer translation={translation} targetDate={timer} />
                        ) : (
                            <p>Invalid timer date</p>
                        )}

                    </div>
                    <TodaysSalesProducts translation={translation} lang={lang} />
                    <div className="flex border-b border-gray-300 pb-[70px] justify-center">
                        <Link href="/allProd">
                            <span className='p-[20px] rounded-lg text-[17px] font-medium px-[50px] bg-red-500'>{translation.main.view}</span>
                        </Link>
                    </div>
                </div>
            }
        </>
    );
};

export default TodaysSales;