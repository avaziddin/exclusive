"use client"

import Image from 'next/image';
import React, { ReactNode } from 'react';

interface pageProps {
    children: ReactNode;
}

const page: React.FC<pageProps> = () => {
    return (
        <>
            <div className="bg-blue-950 w-full flex justify-center pt-[40vh] pb-[51.5vh] overflow-hidden items-center">
                <h1 className="text-[50px] text-white">Welcome to admin panel of Exclusive</h1>
            </div>
        </>
    );
};

export default page; 