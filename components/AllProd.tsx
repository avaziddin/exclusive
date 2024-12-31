"use client";

import { useAppContext } from '@/context';
import React, { useState, useEffect } from 'react';
import AddToWishlist from './AddToWishlist';
import Link from 'next/link';
import Image from 'next/image';
import AddToCart from './AddToCart';

interface AllProdProps {
    translation: any;
}

const AllProd: React.FC<AllProdProps> = ({ translation }) => {
    const { dataProd } = useAppContext();
    const [data, setData] = useState(dataProd);
    const [title, setTitle] = useState(translation.main.explore_our_products);

    const type = localStorage.getItem("type");
    const category = localStorage.getItem("category");

    useEffect(() => {
        let filteredData = dataProd;

        if (category) {
            // Фильтруем товары по категории, если категория выбрана
            filteredData = filteredData.filter((item: any) => item.category === category);
            setTitle(category)
        }

        if (type) {
            if (type === "Flash Sales") {
                filteredData = filteredData.filter((item: any) => item.type === type);
                setTitle(translation.main.flash_sales);
            } else if (type === "Best Selling") {
                const bestSellingProducts = filteredData
                    .filter((product: { type: any }) => product.type === "None")
                    .slice(0, Math.floor(filteredData.length * 0.7));
                filteredData = bestSellingProducts;
                setTitle(translation.main.best_selling);
            }
            else if (type === "All") {
                setTitle(translation.main.explore_our_products);
            }
        }

        setData(filteredData); // Устанавливаем отфильтрованные данные
    }, [type, category, dataProd, translation]);

    return (
        <div className="relative mb-[50px] pb-[40px] mt-[30px] z-0">
            {/* Заголовок и кнопки прокрутки */}
            <div className="mb-[30px]">
                <div className="flex mb-[20px] gap-[10px] items-center">
                    <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
                    <h1 className="text-[17px] font-semibold text-red-500">{title}</h1>
                </div>
            </div>

            {/* Список товаров */}
            <div className="flex flex-wrap gap-[2%]">
                {data.map((item: any) => (
                    <div
                        key={item._id}
                        className="whitespace-nowrap xs:w-full sm:w-[49%] lg:w-[32%] overflow-hidden xl:w-[23.5%] 2xl:w-[18.4%] flex-shrink-0 h-fit mb-[50px]"
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
                                    className="w-content h-[30vh] rounded-lg object-cover"
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
                            <AddToCart translation={translation} id={item._id} border={false} />
                        </div>
                        <Link href={`/${item._id}`}>
                            <h1 className="text-black font-medium mb-[10px] px-[10px]">{item.title}</h1>
                            <div className="flex flex-col justify-start items-start font-medium gap-[10px] px-[10px] mb-[10px]">
                                <div className="flex gap-[10%]">
                                    <span className="flex whitespace-nowrap text-red-500">
                                        {item.discound > 0
                                            ? `$ ${(item.price - (item.price * item.discound) / 100).toFixed(2)}`
                                            : item.price}
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        {item.discound > 0 ? item.price : ""}
                                    </span>
                                </div>
                                <div className="flex items-center gap-[7px]">
                                    {[...Array(5)].map((_, index) => (
                                        <Image key={index} src="/images/YellowStar.svg" alt="rating" width={20} height={20} />
                                    ))}
                                    <span className="text-gray-400">(99)</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex border-b border-gray-300 pb-[70px] justify-center"></div>
        </div>
    );
};

export default AllProd;
