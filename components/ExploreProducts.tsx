"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import AddToWishlist from "./AddToWishlist";
import AddToCart from "./AddToCart";

interface TodaysSalesProductsProps {
  translation: any;
}

const ExploreProduct: React.FC<TodaysSalesProductsProps> = ({ translation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dataProd } = useAppContext();

  // Функция для прокрутки на 2 блока
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current && dataProd?.length) {
      const blockWidth = containerRef.current.scrollWidth / dataProd.length;
      const scrollAmount = blockWidth * 2;

      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Если данных нет, показываем заглушку
  if (!dataProd || dataProd.length === 0) {
    return (
      <div className="relative mb-[50px] pb-[40px] z-0 text-center">
        <p className="text-gray-500">{translation.main.no_products || "No products available."}</p>
      </div>
    );
  }

  const explore_our_products = dataProd
    .filter((product: { type: any }) => product.type === "None")
    .slice(0, Math.floor(dataProd.length * 0.3));  // Оставляем только первые 30% продуктов4

  const handleCategoryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // You can set your category in local storage inside the event handler
    localStorage.setItem("type", "All");
    localStorage.setItem("category", "");
  };



  return (
    <div className="relative mb-[50px] pb-[40px] z-0">
      {/* Заголовок и кнопки прокрутки */}
      <div className="mb-[30px]">
        <div className="flex mb-[20px] gap-[10px] items-center">
          <div className="xs:w-[10px] xs:h-[20px] sm:w-[20px] sm:h-[40px] rounded-lg bg-red-500"></div>
          <h1 className="xs:text-[14px] sm:text-[17px] font-semibold text-red-500">{translation.main.our_products}</h1>
        </div>
        <div className="flex justify-between items-center gap-[5%] mb-[20px]">
          <span className="xs:text-[18px] sm:text-[28px] text-[36px] font-semibold text-black">{translation.main.explore_our_products}</span>
        </div>
      </div>
      <div className="absolute sm:flex xs:hidden top-[5%] right-0 z-10 flex gap-[15px]">
        <button
          onClick={() => scroll("left")}
          className="p-[10px] bg-gray-100 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center hover:bg-gray-200"
        >
          <Image src="/images/arrow.svg" alt="arrow" width={35} height={25} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="rotate-180 p-[10px] bg-gray-100 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center hover:bg-gray-200"
        >
          <Image src="/images/arrow.svg" alt="arrow" width={35} height={25} />
        </button>
      </div>

      {/* Список товаров */}
      <div
        ref={containerRef}
        className={`${explore_our_products.length > 5 ? "grid grid-rows-2 mb-[50px] grid-flow-col" : "flex min-w-full "} gap-[2%] overflow-x-auto scrollbar-hidden`}
        style={{ gridAutoColumns: "calc((100% - (2% * 4)) / 5)" }}
      >
        {explore_our_products.map((item: any) => (
          <div
            key={item._id}
            className={`${explore_our_products.length > 5 ? "w-fit" : "xs:w-full flex-shrink-0 xs:mb-[4vh] sm:w-[49%] lg:w-[32%] xl:w-[23%] mb-[50px]"} hover:bg-gray-100 group rounded-lg pb-[10px] transition-[.1s]`}
          >
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
            </Link>
          </div>
        ))}
      </div>
      <div className="flex border-b border-gray-300 xs:pb-[4vh] pb-[70px] justify-center">
        <Link href="/allProd" onClick={handleCategoryClick} >
          <span className="xs:p-[10px] xs:text-[16px] sm:p-[15px] lg:p-[20px] rounded-lg sm:text-[17px] font-medium lg:px-[50px] bg-red-500">
            {translation.main.view}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ExploreProduct;
