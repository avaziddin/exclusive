"use client"
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    targetDate: string;
    translation: any
}

const CountdownTimerSec: React.FC<CountdownTimerProps> = ({ targetDate, translation }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const timeDifference = new Date(targetDate).getTime() - now.getTime();

            if (timeDifference <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="countdown-timer flex gap-[7%] text-black">
            <div className="flex flex-col gap-[0px] leading-none justify-center items-center w-[70px] h-[50px] xl:h-[70px] rounded-[50%] bg-white">
                <span className='xs:text-[14px] sm:text-[20px] font-bold'>
                    {timeLeft.days}
                </span>
                <span className='lg:text-[14px]  xs:text-[9px]'>{translation.main.days}</span>

            </div>


            <div className="flex flex-col gap-[0px] leading-none justify-center items-center w-[70px] h-[50px] xl:h-[70px] rounded-[50%] bg-white">
                <span className='xs:text-[14px] lg:text-[20px] font-bold'>
                    {timeLeft.hours}
                </span>
                <span className='lg:text-[14px] xs:text-[9px]'>{translation.main.hours}</span>
            </div>



            <div className="flex flex-col gap-[0px] leading-none justify-center items-center w-[70px] h-[50px] xl:h-[70px] rounded-[50%] bg-white">
                <span className='xs:text-[14px] lg:text-[20px] font-bold'>
                    {timeLeft.minutes}
                </span>
                <span className='lg:text-[14px] xs:text-[9px]'>{translation.main.minutes}</span>
            </div>



            <div className="flex flex-col gap-[0px] leading-none justify-center items-center w-[70px] h-[50px] xl:h-[70px] rounded-[50%] bg-white">
                <span className='xs:text-[14px] lg:text-[20px] font-bold'>
                    {timeLeft.seconds}
                </span>
                <span className='lg:text-[14px] xs:text-[9px]'>{translation.main.seconds}</span>
            </div>


        </div>
    );
};

export default CountdownTimerSec;
