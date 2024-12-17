"use client"

import React, { ReactNode, useState } from 'react';


const Count_Modal: React.FC = () => {

    const [count, setCount] = useState(1)

    if(count > 9){
        setCount(9)
    }
    if(count < 1){
        setCount(1)
    }

    return (
        <>
            <div className="bg-gray-200 flex justify-between  w-hit items-center rounded-[15px]">
                <button onClick={() => setCount(count - 1)} className="w-[40%] xs:text-[14px] ms:text-ms lg:text-lg scale-[1.5]  text-center p-[10px] rounded-[15px] ">
                    -
                </button>
                <span>{count}</span>
                <button onClick={() => setCount(count + 1)} className="w-[40%] xs:text-[14px] ms:text-ms lg:text-lg scale-[1.5]  text-center p-[10px] rounded-[15px] ">
                    +
                </button>
            </div>
        </>
    );
};

export default Count_Modal;