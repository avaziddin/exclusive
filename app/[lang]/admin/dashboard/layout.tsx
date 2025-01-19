"use client"

import { AppWrapper } from '@/context';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

interface DashboardProps {
    children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }: { children: ReactNode }) => {

    const pathName = usePathname()

    return (

        <AppWrapper>



            <div className="flex bg-blue-950">

                <aside className='w-[18%] flex flex-col justify-between fixed top-0 bottom-0 p-[1%] bg-blue-950 h-[100vh]'>

                    <div className="">

                        <Link href={"/admin/dashboard"}>
                            <h1 className='text-[30px] text-white mb-[15%] pl-[3%] font-semibold'>Exclusive</h1>
                        </Link>
                        <div className="flex flex-col text-[25px] font-medium text-white gap-[1%]">
                            <Link href="/admin/dashboard">
                                <button
                                    className={`w-full mb-[2%] flex items-center  justify-start py-[3%] px-[5%] gap-[5%] rounded-md  transition-[.3s] ${pathName === "/ru/admin/dashboard" ? "bg-gray-200 text-black" : ""}`}
                                >
                                    Dashboard
                                </button>
                            </Link>
                            <Link href="/admin/dashboard/category">
                                <button
                                    className={`w-full mb-[2%] flex items-center  justify-start py-[3%] px-[5%] gap-[5%] rounded-md  transition-[.3s] ${pathName === "/ru/admin/dashboard/category" ? "bg-gray-200 text-black" : ""}`}
                                >
                                    Categoryes
                                </button>
                            </Link>
                            <Link href="/admin/dashboard/slider">
                                <button
                                    className={`w-full flex items-center  justify-start py-[3%] px-[5%] gap-[5%] rounded-md  transition-[.3s] ${pathName === "/ru/admin/dashboard/slider" ? "bg-gray-200 text-black" : ""}`}
                                >
                                    Slider
                                </button>
                            </Link>
                            <Link href="/admin/dashboard/countdown">
                                <button
                                    className={`w-full flex items-center  justify-start py-[3%] px-[5%] gap-[5%] rounded-md  transition-[.3s] ${pathName === "/ru/admin/dashboard/countdown" ? "bg-gray-200 text-black" : ""}`}
                                >
                                    Countdown
                                </button>
                            </Link>
                            <Link href="/admin/dashboard/product">
                                <button
                                    className={`w-full flex items-center  justify-start py-[3%] px-[5%] gap-[5%] rounded-md  transition-[.3s] ${pathName === "/ru/admin/dashboard/product" ? "bg-gray-200 text-black" : ""}`}
                                >
                                    Products
                                </button>
                            </Link>
                            <Link href="/admin/dashboard/orders">
                                <button
                                    className={`w-full flex items-center  justify-start py-[3%] px-[5%] gap-[5%] rounded-md  transition-[.3s] ${pathName === "/ru/admin/dashboard/product" ? "bg-gray-200 text-black" : ""}`}
                                >
                                    Orders
                                </button>
                            </Link>
                            <Link href="/admin/dashboard/users">
                                <button
                                    className={`w-full flex items-center  justify-start py-[3%] px-[5%] gap-[5%] rounded-md  transition-[.3s] ${pathName === "/ru/admin/dashboard/users" ? "bg-gray-200 text-black" : ""}`}
                                >
                                    Users
                                </button>
                            </Link>
                        </div>
                    </div>

                    <Link href="/">
                        <button
                            className='w-full text-[22px] hover:bg-gray-100 flex justify-start p-[1%] text-white rounded-md hover:text-black transition-[.3s]'
                        >Log out</button>
                    </Link>


                </aside>

                <main className='w-full bg-blue-950 h-[100vh] ml-[18%] bg-background'>
                    {children}
                </main>
            </div>
        </AppWrapper>
    );
};

export default Dashboard;