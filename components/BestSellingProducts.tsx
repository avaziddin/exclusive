"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import React, { lazy } from "react";
import AddToWishlist from "./AddToWishlist";

interface BestSellingProductsProps {
    translation: any;
    lang: any
}

const BestSellingProducts: React.FC<BestSellingProductsProps> = ({ translation, lang }) => {

    const { dataProd } = useAppContext()

    const best_selling = dataProd
        .filter((product: { type: any }) => product.type === "None")
        .slice(0, Math.floor(dataProd.length * 0.7));  // Оставляем последние 70% продуктов



    return (
        <div className="relative mb-[100px] z-0">
            <div className="mb-[50px]">
                <div className="flex mb-[20px] gap-[10px] items-center">
                    <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
                    <h1 className="text-[17px] font-semibold text-red-500">{translation.main.this_month}</h1>
                </div>
                <div className="flex justify-between items-center gap-[5%] mb-[20px]">
                    <span className="text-[36px] font-semibold text-black">{translation.main.best_selling}</span>
                    <Link href="/allProd">
                        <span className="p-[20px] rounded-lg text-[17px] font-medium px-[50px] bg-red-500">
                            {translation.main.view_all}
                        </span>
                    </Link>
                </div>
            </div>
            <div className="flex min-w-full overflow-x-auto scrollbar-hidden gap-[2%]">
                {best_selling.map((item: any) => (
                    <div
                        key={item._id}
                        className="whitespace-nowrap w-[18.4%] flex-shrink-0 h-fit mb-[50px]"
                    >
                        <div className="hover:bg-gray-100 group rounded-lg w-fit pb-[20px] transition-[.1s]">
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
                                <div className="w-full cursor-pointer flex justify-center items-center py-[10px] rounded-b-lg bg-black text-white absolute bottom-0 opacity-0 group-hover:opacity-100 transition">
                                    <span>{translation.main.add_to_cart}</span>
                                </div>
                            </div>
                            <div className="">
                                <h1 className="text-black font-medium mb-[10px] px-[10px]">
                                    {item.titles[lang]}
                                </h1>
                                <div className="flex font-medium gap-[10px] px-[10px] mb-[10px]">
                                    <span className="text-red-500">
                                        {item.discound > 0
                                            ? `$ ${(item.price - (item.price * item.discound) / 100).toFixed(2)}`
                                            : item.price}
                                    </span>
                                    <span className="text-gray-500 line-through">
                                        {item.discound > 0 ?
                                            item.price : ""}
                                    </span>
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
