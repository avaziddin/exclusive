"use client"

import { useAppContext } from '@/context';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';

interface Change_nameProps {
    translation: any;
}

const Change_name: React.FC<Change_nameProps> = ({ translation }) => {

    const { dataUsers } = useAppContext();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const cookieStore = document.cookie;
        const userIdCookie = cookieStore
            .split("; ")
            .find((row) => row.startsWith("userId="))
            ?.split("=")[1];

        setUserId(userIdCookie || null);
    }, []);

    const user = Array.isArray(dataUsers)
        ? dataUsers.find((el: any) => el._id === userId)
        : null;


    return (
        <>
            <div className="w-full px-[7%] flex justify-between mt-[50px] items-center">
                <div className="flex gap-2 xs:text-[16px] items-center sm:text-xl">
                    <Link href="/">
                        <span className="xs:text-[14px] sm:text-xl text-gray-400">{translation.main.account.home}</span>
                    </Link>
                    <span className="xs:text-[14px] whitespace-nowrap sm:text-xl text-black">/</span>
                    <span className="xs:text-[14px] whitespace-nowrap sm:text-xl text-black">{translation.main.account.my}</span>
                </div>
                <div className="text-black xs:text-[12px] whitespace-nowrap sm:text-xl flex gap-5">
                    <span className='xs:hidden'>{translation.main.account.welcome}</span>
                    <span
                        style={{ textTransform: "capitalize" }} className="xs:text-[14px] whitespace-nowrap sm:text-xl text-red-500">{user?.name || ""}</span>
                </div>
            </div>
        </>
    );
};

export default Change_name;