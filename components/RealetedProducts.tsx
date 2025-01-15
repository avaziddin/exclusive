"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import AddToWishlist from "./AddToWishlist";
import AddToCart from "./AddToCart";

interface TodaysSalesProductsProps {
  translation: any;
  category: string;
  lang: any
}

const RealetedProduct: React.FC<TodaysSalesProductsProps> = ({ translation, category, lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dataProd } = useAppContext();

  return (
    <div className="relative mb-[50px] pb-[40px] z-0">
      {/* Проверка наличия товаров в категории */}
      {Array.isArray(dataProd) && dataProd.some((item: any) => item.category === category) && (
        <div className="mb-[30px]">
          <div className="flex mb-[20px] gap-[10px] items-center">
            <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
            <h1 className="text-[17px] font-semibold text-red-500">{translation.main.our_products}</h1>
          </div>
        </div>
      )}

      {/* Список товаров */}
      <div
        ref={containerRef}
        className="flex min-w-full overflow-x-auto scrollbar-hidden gap-[2%]" // 6 элементов + 5 gap
      >
        {Array.isArray(dataProd) &&
          dataProd.map((item: any) =>
            item.category === category ? (
              <div
                key={item._id}
                className="whitespace-nowrap xs:w-full sm:w-[49%] lg:w-[32%] overflow-hidden xl:w-[23.5%] flex-shrink-0 h-fit mb-[50px]"
              >


                <div className="hover:bg-gray-100 group rounded-lg w-fit pb-[20px] transition-[.1s]">
                  <div className="mb-[10px] relative rounded-xl">
                    <div className="absolute left-0 flex justify-end pr-[3%] top-4 z-50 w-full">
                      <AddToWishlist id={item._id} border={false} />
                    </div>
                    <Link href={`/${item._id}`}>
                      <div className="absolute xs:p-[3px] cursor-pointer xs:right-[2.9%] xs:top-[21%] lg:top-[22%] lg:p-[7px] flex items-center justify-center rounded-full lg:right-[3%] bg-white">
                        <Image
                          src="/images/eye.svg"
                          alt="View details"
                          width={20}
                          height={20}
                        />
                      </div>
                    </Link>
                    {item.discound > 0 && (
                      <div className="px-[10px] py-[3px] bg-red-500 rounded-lg absolute top-[2%] left-[2%]">
                        <span>-{item.discound}%</span>
                      </div>
                    )}

                    <Link href={`/${item._id}`}>
                      <Image
                        className="w-content h-[35vh] rounded-lg object-cover"
                        src={item.image?.[0] || "/images/default.png"}
                        alt="Product"
                        width={500}
                        height={300}
                      />
                    </Link>
                    <AddToCart translation={translation} id={item._id} border={false} />
                  </div>
                  <div>
                    <h1 className="text-black font-medium mb-[10px] px-[10px]">
                      {item.titles?.[lang] || "No title"}
                    </h1>
                    <div className="flex font-medium gap-[10px] px-[10px] mb-[10px]">
                      <span className="text-red-500">{item.discound > 0 ? (item.price - (item.price * item.discound) / 100).toFixed(2) : item.price}</span>
                    </div>
                    <div className="flex items-center px-[10px] gap-[7px]">
                      {Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <Image
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
            ) : null
          )}
      </div>
    </div>
  );
};

export default RealetedProduct;
