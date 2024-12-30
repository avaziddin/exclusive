"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import AddToWishlist from "./AddToWishlist";
import AllProd from "./AllProd";
import AddToCart from "./AddToCart";

interface TodaysSalesProductsProps {
  translation: any;
  lang: any
}

const TodaysSalesProducts: React.FC<TodaysSalesProductsProps> = ({ translation, lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { dataProd, loading} = useAppContext();
    
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const blockWidth = containerRef.current.children[0]?.getBoundingClientRect().width || 0;
      const scrollAmount = blockWidth * 2;

      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // You can set your category in local storage inside the event handler
    localStorage.setItem("type", "Flash Sales");
    localStorage.setItem("category", "");
  };

  const flash_sales = dataProd.filter((product: { type: any; }) => product.type === "Flash Sales");





  return (
    <div className="relative z-0">
      {/* Кнопки прокрутки */}
      <div className="absolute top-[-17%] right-0 z-10 flex gap-[15px]">
        <button
          onClick={() => scroll("left")}
          className="p-[10px] bg-gray-100 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center hover:bg-gray-200"
          aria-label="Scroll Left"
        >
          <Image src="/images/arrow.svg" alt="Scroll Left" width={35} height={25} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="rotate-180 p-[10px] bg-gray-100 text-white w-[45px] h-[45px] rounded-full flex items-center justify-center hover:bg-gray-200"
          aria-label="Scroll Right"
        >
          <Image src="/images/arrow.svg" alt="Scroll Right" width={35} height={25} />
        </button>
      </div>

      {/* Список товаров */}
      <div
        ref={containerRef}
        className="flex min-w-full overflow-x-auto scrollbar-hidden gap-[2%]"
      >


        {loading ? (
          <div className="flex justify-center items-center w-full h-[49.5vh]">

            <div role="status">
              <svg aria-hidden="true" className="w-[60px] h-[60px] text-gray-100 animate-spin dark:text-gray-300 fill-gray-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>

          </div>
        ) : (


          flash_sales.map((item: any) => (
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
                    <div className="absolute cursor-pointer top-[22%] p-[7px] flex items-center justify-center rounded-full right-[3%] bg-white">
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
                      className="w-content h-[30vh] rounded-lg object-cover"
                      src={item.image?.[0] || "/images/default.png"}
                      alt={item.titles[lang] || "Product"}
                      width={500}
                      height={300}
                    />
                  </Link>

                  <AddToCart id={item._id}/>
                  
                </div>

                <Link href={`/${item._id}`}>
                  <div>
                    <h1 className="text-black font-medium mb-[10px] px-[10px]">
                      {item.titles?.[lang] || "No title"}
                    </h1>
                    <div className="flex font-medium gap-[10px] px-[10px] mb-[10px]">
                      <span className="text-red-500">
                        ${(item.price - (item.price * item.discound) / 100).toFixed(2)}
                      </span>
                      <span className="text-gray-400 line-through">{item.price} $</span>
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
                </Link>
              </div>

            </div>
          )))}

      </div>
        <div className="flex border-b border-gray-300 pb-[70px] justify-center">
        <Link href="/allProd" onClick={handleCategoryClick}>
            <span className='p-[20px] rounded-lg text-[17px] font-medium px-[50px] bg-red-500'>{translation.main.view}</span>
          </Link>
        </div>
    </div>
  );
};

export default TodaysSalesProducts;
