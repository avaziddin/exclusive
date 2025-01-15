"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import React, { lazy } from "react";
import AddToWishlist from "./AddToWishlist";
import AddToCart from "./AddToCart";

interface BestSellingProductsProps {
    translation: any;
    lang: any
}

const BestSellingProducts: React.FC<BestSellingProductsProps> = ({ translation, lang }) => {

    const { dataProd } = useAppContext()

    const best_selling = dataProd
        .filter((product: { type: any }) => product.type === "None")
        .slice(0, Math.floor(dataProd.length * 0.7));  // Оставляем последние 70% продуктов

    const handleCategoryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        // You can set your category in local storage inside the event handler
        localStorage.setItem("type", "Best Selling");
        localStorage.setItem("category", "");
    };


    return (
        <div className="relative xs:mb-[5vh] mb-[100px] z-0">
            <div className="xs:mb-[5vh] mb-[50px]">
                <div className="flex mb-[20px] gap-[10px] items-center">
                    <div className="xs:w-[10px] xs:h-[20px] sm:w-[20px] sm:h-[40px] rounded-lg bg-red-500"></div>
                    <h1 className="xs:text-[14px] sm:text-[17px] font-semibold text-red-500">{translation.main.this_month}</h1>
                </div>
                <div className="flex justify-between items-center xs:gap-[1vh] gap-[5%] mb-[20px]">
                    <span className="xs:text-[16px] sm:text-[28px] text-[36px] font-semibold text-black">{translation.main.best_selling}</span>
                    <Link href="/allProd" onClick={handleCategoryClick}>
                        <span className="xs:p-[10px] xs:text-[14px] xs:whitespace-nowrap sm:p-[15px] lg:p-[20px] rounded-lg sm:text-[17px] font-medium lg:px-[50px] bg-red-500">
                            {translation.main.view_all}
                        </span>
                    </Link>
                </div>
            </div>
            <div className="flex min-w-full overflow-x-auto scrollbar-hidden gap-[2%]">
                {best_selling.map((item: any) => (
                    <div
                        key={item._id}
                        className="whitespace-nowrap xs:w-full sm:w-[49%] lg:w-[32%] xl:w-[23.5%]  flex-shrink-0 h-fit mb-[50px]"
                    >
                        <div className="hover:bg-gray-100 group rounded-lg w-fit pb-[20px] transition-[.1s]">
                            <div className="mb-[10px] relative rounded-xl">
                                <div className="absolute left-0 flex justify-end pr-[3%] top-4 z-50 w-full">
                                    <AddToWishlist id={item._id} border={false} />
                                </div>
                                <Link href={`/${item._id}`}>
                                    <div className="absolute xs:p-[3px] cursor-pointer xs:right-[2.9%] xs:top-[21%] lg:top-[22%] lg:p-[7px] lg:flex lg:items-center lg:justify-center rounded-full lg:right-[3%] bg-white">
                                        <Image
                                            src="/images/eye.svg"
                                            alt="View details"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                </Link>

                                <Link href={`/${item._id}`}>
                                    <Image
                                        className="w-conent h-[35vh] rounded-lg object-cover"
                                        src={item.image?.[0] || "/images/placeholder.png"}
                                        alt="product"
                                        width={500}
                                        height={300}
                                    />
                                </Link>
                                <AddToCart translation={translation} border={false} id={item._id} />

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
                                    {Array(5)
                                        .fill(0)
                                        .map((_, index) => (
                                            <Image
                                                className="xs:w-[15px]"
                                                key={index}
                                                src="/images/YellowStar.svg"
                                                alt="rating"
                                                width={20}
                                                height={20}
                                            />
                                        ))}
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
