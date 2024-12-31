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
    const { count} = useAppContext()
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
                <div className="w-full xs:mb-[5vh] mb-[50px]">
                    <div className="flex gap-[10px] items-center ">
                        <div className="xs:w-[10px] xs:h-[20px] sm:w-[20px] sm:h-[40px] rounded-lg bg-red-500"></div>
                        <h1 className="xs:text-[14px] sm:text-[17px] font-semibold text-red-500">{translation.main.todays}</h1>
                    </div>
                    <div className="flex gap-[5%] mb-[40px] items-end">
                        <span className="xs:text-[18px] sm:text-[30px] text-[36px] font-semibold text-black">{translation.main.flash_sales}</span>

                        {timer && !isNaN(new Date(timer).getTime()) ? (
                            <CountdownTimer translation={translation} targetDate={timer} />
                        ) : (
                            <p>Invalid timer date</p>
                        )}

                    </div>
                    <TodaysSalesProducts translation={translation} lang={lang} />
                    
                </div>
            }
        </>
    );
};

export default TodaysSales;