"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CountdownTimerSec from "./CountdownSec";
import { useAppContext } from "@/context";

interface MainBannerStatickProps {
    translation: any;
}

const MainBannerStatick: React.FC<MainBannerStatickProps> = ({ translation }) => {
    const { count } = useAppContext();
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

            timeDifference <= 0 ? setTimeOver(true) : setTimeOver(false)
        }
    }, [timer]);

    return (
        <>
            {!timeOver &&

                <div className="w-full xs:hidden md:flex xs:mb-[7vh] lg:flex justify-between pt-[2%] pb-[2%] px-[4%] bg-black text-white mb-[150px]">
                    <div className="pt-[1%]">
                        <span className="xs:text-[16px] lg:text-[18px] font-bold text-green-500 ">Categories</span>
                        <h1 className="xs:text-[15px] lg:text-[48px] mb-[30%] leading-tight pt-[30px]">
                            Enhance Your <br /> Music Experience
                        </h1>

                        {timer && !isNaN(new Date(timer).getTime()) ? (
                            <CountdownTimerSec translation={translation} targetDate={timer} />
                        ) : (
                            <p>Invalid timer date</p>
                        )}
                        {/* {{<button className="mt-[10%] px-[40px] py-[15px] bg-green-500 text-white font-bold rounded hover:bg-green-600 transition">
                            Buy now
                        </button>} */}
                    </div>

                    <div className="relative  w-[40%]  mr-[5%]">
                        <div className="absolute inset-0 bg-gradient-to-r from-white rounded-[50%] to-transparent opacity-70 blur-xl z-0"></div>

                        <Image
                            className="relative xs:pt-[5vh] z-10 w-full object-cover"
                            src="/images/jblimg.svg"
                            alt="jbl"
                            width={600}
                            height={1000}
                        />
                    </div>
                </div>
            }

        </>
    );
};

export default MainBannerStatick;
