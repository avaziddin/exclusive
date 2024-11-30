"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BestSellingProductsProps {
    translation: any;
}

const data = Array(23).fill(1); // Пример данных

const BestSellingProducts: React.FC<BestSellingProductsProps> = ({ translation }) => {
    // Ограничиваем количество отображаемых товаров
    const visibleProducts = data.slice(0, 5);

    return (
        <div className="relative mb-[100px] z-0">
            <div className="mb-[50px]">
                <div className="flex mb-[20px] gap-[10px] items-center">
                    <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
                    <h1 className="text-[17px] font-semibold text-red-500">{translation.main.this_month}</h1>
                </div>
                <div className="flex justify-between items-center gap-[5%] mb-[20px]">
                    <span className="text-[36px] font-semibold text-black">{translation.main.best_selling}</span>
                    <Link href="/">
                        <span className="p-[20px] rounded-lg text-[17px] font-medium px-[50px] bg-red-500">
                            {translation.main.view_all}
                        </span>
                    </Link>
                </div>
            </div>
            <div className="flex min-w-full overflow-x-auto scrollbar-hidden gap-[2%]">
                {visibleProducts.map((_, index) => (
                    <div
                        key={index}
                        className="whitespace-nowrap w-[18.4%] flex-shrink-0 h-fit mb-[50px]"
                    >
                        <div className="hover:bg-gray-100 group rounded-lg w-fit pb-[20px] transition-[.1s]">
                            <div className="mb-[10px] relative rounded-xl">
                                <div className="absolute cursor-pointer top-[5%] p-[7px] pt-[8px] flex items-center justify-center rounded-full right-[3%] bg-white">
                                    <Image
                                        src="/images/heart.svg"
                                        alt="heart"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                <div className="absolute cursor-pointer top-[19%] p-[7px] pt-[8px] flex items-center justify-center rounded-full right-[3%] bg-white">
                                    <Image
                                        src="/images/eye.svg"
                                        alt="eye"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                <Image
                                    className="w-content h-[30vh] rounded-lg object-cover"
                                    src="/images/prod.svg"
                                    alt="product"
                                    width={500}
                                    height={300}
                                />
                                <div className="w-full cursor-pointer flex justify-center items-center py-[10px] rounded-b-lg bg-black text-white absolute bottom-0 opacity-0 group-hover:opacity-100 transition">
                                    <span>{translation.main.add_to_cart}</span>
                                </div>
                            </div>
                            <div className="">
                                <h1 className="text-black font-medium mb-[10px] px-[10px]">
                                    HAVIT HV-G92 Gamepad
                                </h1>
                                <div className="flex font-medium gap-[10px] px-[10px] mb-[10px]">
                                    <span className="text-red-500">$120</span>
                                    <span className="text-gray-400 line-through">$160</span>
                                </div>
                                <div className="flex items-center px-[10px] gap-[7px]">
                                    <div className="flex items-center gap-[7px]">
                                        <Image
                                            src="/images/YellowStar.svg"
                                            alt="rating"
                                            width={20}
                                            height={20}
                                        />
                                        <Image
                                            src="/images/YellowStar.svg"
                                            alt="rating"
                                            width={20}
                                            height={20}
                                        />
                                        <Image
                                            src="/images/YellowStar.svg"
                                            alt="rating"
                                            width={20}
                                            height={20}
                                        />
                                        <Image
                                            src="/images/YellowStar.svg"
                                            alt="rating"
                                            width={20}
                                            height={20}
                                        />
                                        <Image
                                            src="/images/YellowStar.svg"
                                            alt="rating"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <span className="flex justify-center items-center text-gray-400">
                                        (99)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellingProducts;
