"use client"
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    targetDate: string;
    translation: any
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, translation }) => {
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
            <div className="flex flex-col justify-center items-center">
                <span className='xs:text-[10px] sm:text-[13px]'>{translation.main.days}</span>
                <span className='xs:text-[15px] sm:text-[28px] text-[35px] font-semibold'>
                    {timeLeft.days}
                </span>

            </div>

            <span className='xs:text-[20px] sm:text-[28px] text-[40px] font-semibold flex items-end text-red-500'>:</span>

            <div className="flex flex-col justify-center items-center">
                <span className='xs:text-[10px] sm:text-[13px]'>{translation.main.hours}</span>
                <span className='xs:text-[15px] sm:text-[28px] text-[35px] font-semibold'>
                    {timeLeft.hours}
                </span>
            </div>

            <span className=' xs:text-[20px] sm:text-[28px] text-[40px] font-semibold flex items-end text-red-500'>:</span>


            <div className="flex flex-col justify-center items-center">
                <span className='xs:text-[10px] sm:text-[13px]'>{translation.main.minutes}</span>
                <span className='xs:text-[15px] sm:text-[28px] text-[35px] font-semibold'>
                    {timeLeft.minutes}
                </span>
            </div>

            <span className='xs:text-[20px] sm:text-[28px] text-[40px] font-semibold flex items-end text-red-500'>:</span>


            <div className="flex flex-col justify-center items-center">
                <span className='xs:text-[10px] sm:text-[13px]'>{translation.main.seconds}</span>
                <span className='xs:text-[15px] sm:text-[28px] text-[35px] font-semibold'>
                    {timeLeft.seconds}
                </span>
            </div>


        </div>
    );
};

export default CountdownTimer;
