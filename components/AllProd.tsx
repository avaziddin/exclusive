"use client"

import { useAppContext } from '@/context';
import React, { ReactNode } from 'react';
import AddToWishlist from './AddToWishlist';
import Link from 'next/link';
import Image from 'next/image';

interface AllProdProps {
    translation: any;
}

const AllProd: React.FC<AllProdProps> = ({ translation }) => {

    const { dataProd } = useAppContext()

    return (
        <>
            <div className="relative mb-[50px] pb-[40px] mt-[30px] z-0">
                {/* Заголовок и кнопки прокрутки */}
                <div className="mb-[30px]">
                    <div className="flex mb-[20px] gap-[10px] items-center">
                        <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
                        <h1 className="text-[17px] font-semibold text-red-500">{translation.main.our_products}</h1>
                    </div>

                </div>


                {/* Список товаров */}
                <div
                    className='flex flex-wrap gap-[2%]'
                >
                    {dataProd.map((item: any) => (
                        <div
                            key={item._id}
                            className={"w-[18.4%] mb-[50px] hover:bg-gray-100 group rounded-lg pb-[10px] transition-[.1s]"}
                        >
                            <div className="mb-[10px] relative rounded-xl">
                                <div className="absolute left-0 flex justify-end pr-[3%] top-4 z-50 w-full">
                                    <AddToWishlist id={item._id} border={false} />
                                </div>

                                <Link href={`/${item._id}`}>
                                    <div className="absolute cursor-pointer top-[21%] p-[7px] pt-[8px] flex items-center justify-center rounded-full right-[3%] bg-white">
                                        <Image src="/images/eye.svg" alt="eye" width={20} height={20} />
                                    </div>
                                </Link>

                                <Link href={`/${item._id}`}>
                                    <Image
                                        className="w-conent h-[30vh] rounded-lg object-cover"
                                        src={item.image?.[0] || "/images/placeholder.png"}
                                        alt="product"
                                        width={500}
                                        height={300}
                                    />
                                </Link>

                                {item.discound > 0 && (
                                    <div className="px-[10px] py-[3px] bg-red-500 rounded-lg absolute top-[2%] left-[2%]">
                                        <span>-{item.discound}%</span>
                                    </div>
                                )}
                                <div className="w-full cursor-pointer flex justify-center items-center py-[10px] rounded-b-lg bg-black text-white absolute bottom-0 opacity-0 group-hover:opacity-100 transition">
                                    <span>{translation.main.add_to_cart}</span>
                                </div>
                            </div>
                            <Link href={`/${item._id}`}>
                                <h1 className="text-black font-medium mb-[10px] px-[10px]">{item.title}</h1>
                                <div className=" flex flex-col justify-start items-start font-medium gap-[10px] px-[10px] mb-[10px]">

                                    <div className="flex gap-[10%]">

                                        <span className="flex whitespace-nowrap text-red-500">
                                            {item.discound > 0
                                                ? `$ ${(item.price - (item.price * item.discound) / 100).toFixed(2)}`
                                                : item.price}
                                        </span>

                                        <span className="text-gray-400 line-through">
                                            {item.discound > 0
                                                ? item.price
                                                : ""}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-[7px]">
                                        {[...Array(5)].map((_, index) => (
                                            <Image
                                                key={index}
                                                src="/images/YellowStar.svg"
                                                alt="rating"
                                                width={20}
                                                height={20}
                                            />
                                        ))}
                                        <span className="text-gray-400">(99)</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="flex border-b border-gray-300 pb-[70px] justify-center">
                </div>
            </div>
        </>
    );
};

export default AllProd;