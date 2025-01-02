"use client";

import { useAppContext } from '@/context';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import RealetedProduct from './RealetedProducts';
import AddToWishlist from './AddToWishlist';

interface ProductIdProps {
    id: string;
    lang: any;
    translation: any;
}

const ProductId: React.FC<ProductIdProps> = ({ id, lang, translation }) => {
    const { dataProd, dataCat, dataUsers } = useAppContext();
    const [count, setCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        const cookieStore = document.cookie;
        const userIdCookie = cookieStore
            .split("; ")
            .find((row) => row.startsWith("userId="))
            ?.split("=")[1];
        setUserId(userIdCookie || null);
    }, []);


    const safeDataProd = Array.isArray(dataProd) ? dataProd : [];
    const filteredData = safeDataProd.find((item: any) => item._id === id)

    useEffect(() => {
        if (Array.isArray(dataProd)) {
            const product = dataProd.find((item: any) => item._id === id);

            if (product) {
                if (Array.isArray(product.colors) && product.colors.length > 0) {
                    setSelectedItems([product.colors[0]]);
                }

                if (Array.isArray(product.size) && product.size.length > 0) {
                    setSelectedSize([product.size[0]]);
                }
            }
        }
        setTimeout(() => setIsLoading(false), 1000); // Имитация загрузки
    }, [dataProd, id]);

    console.log(selectedItems, selectedSize);




    const handleProcess = () => {
        const productsData: any[] = [];


        const quantity = count;
        const priceAfterDiscount =
            filteredData.price - (filteredData.price * filteredData.discound) / 100;
        const totalPrice = priceAfterDiscount * quantity;

        productsData.push({
            _id: filteredData._id,
            quantity,
            price: priceAfterDiscount.toFixed(2),
            total: totalPrice.toFixed(2),
            type: "pending",
            colors: selectedItems.length > 0 ? selectedItems : undefined, // Если есть цвет, добавляем, иначе undefined
            size: selectedSize.length > 0 ? selectedSize : undefined
        });



        localStorage.setItem('cartData', JSON.stringify(productsData));

        window.location.href = "/checkout"

        console.log('Data saved to localStorage:', productsData);
    };

    const toggleSize = (item: any) => {
        setSelectedSize([item]);
    };

    const toggleItem = (item: any) => {
        setSelectedItems([item]);
    };

    if (count > 20) setCount(9);
    if (count < 1) setCount(1);

    return (
        <>
            {isLoading ? (
                <div className="animate-pulse mt-[10vh] mb-[10vh]">
                    <div className="flex gap-6">
                        <div className="w-[67%]">
                            <div className="h-[73vh] bg-gray-200 rounded-md"></div>
                        </div>
                        <div className="w-[30%] flex flex-col gap-4">
                            <div className="h-[35px] bg-gray-200 rounded"></div>
                            <div className="h-[20px] bg-gray-200 rounded"></div>
                            <div className="h-[60px] bg-gray-200 rounded"></div>
                            <div className="h-[150px] bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            ) : (
                Array.isArray(dataProd) &&
                dataProd.map((item: any) =>
                    Array.isArray(dataCat) &&
                    dataCat.map((el: any) =>
                        item._id === id && item.category === el.titles.en ? (
                            <div key={item._id}>
                                <div className="mb-[15vh]">
                                    <div className="mt-[30px] mb-[20px]">
                                        <p className="flex gap-[.5%] text-gray-400 xs:text-[14px] sm:text-[20px]">
                                            <span>/</span>
                                            {el.titles[lang]}
                                            <span className="text-black">/</span>
                                            <span className="text-black">{item.titles?.[lang]}</span>
                                        </p>
                                    </div>

                                    <div className=" xs:flex-col sm:flex-row flex h-fit w-full xs:justify-center xl:justify-between xs:mt-[0px] sm:mt-[80px]">
                                        <div className="xs:w-full xs:h-[35vh] sm:w-[67%]  sm:h-[73vh] overflow-hidden flex gap-[3vh]">
                                            <div className="xs:hidden xl:flex flex w-[25%] flex-col justify-between gap-[1vh]">
                                                {item.image.slice(1, 5).map((src: string, index: number) => (
                                                    <div key={index} className="w-full h-[22%]">
                                                        <Image
                                                            className="w-full h-full object-cover rounded-md"
                                                            src={src}
                                                            alt={`Image ${index + 1}`}
                                                            width={200}
                                                            height={200}
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="xs:w-full sm:w-[73%] h-full">
                                                <Image
                                                    className="object-cover w-full h-full rounded-md"
                                                    src={item.image[0]}
                                                    alt="Main image"
                                                    width={700}
                                                    height={700}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-[2vh] lg:w-[45%] xl:w-[30%] text-black justify-between">
                                            <h1 className="sm:text-[25px] md:text-[30px] lg:text-[32px] xl:text-[35px] font-semibold">{item.titles[lang]}</h1>
                                            <div className="flex xs:hidden gap-4 items-center">
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
                                                <span className="text-[16px] text-gray-400">(150 Reviews)</span>
                                                <span className="text-gray-400">|</span>
                                                <span className="text-green-400">In Stock</span>
                                            </div>
                                            <div className="flex gap-[2%] items-center">
                                                <span className="text-black xs:text-[20px] sm:text-[25px]">${item.discound > 0 ? (item.price - (item.price * item.discound) / 100) : item.price}</span>
                                                <span className="text-gray-500 xs:text-[15px] sm:text-[20px] line-through">{item.discound > 0 ? item.price : ""}</span>
                                            </div>

                                            <div className="w-full break-words">
                                                <span>{item.description[lang]}</span>
                                            </div>
                                            <div className="w-full h-[2px] bg-gray-300"></div>

                                            {Array.isArray(item.colors) && item.colors.length > 0 && (
                                                <div className="flex gap-3 md:mb-[10px] lg:mb-0 xl:items-center xs:items-start">
                                                    <span className="sm:text-[16px] md:text-[18px] flex whitespace-nowrap font-medium">
                                                        {translation.main.product.colors}
                                                    </span>
                                                    <div className="flex xs:flex-wrap sm:gap-3 xs:gap-[10px] lg:gap-2">
                                                        {item.colors.map((element: any) => (
                                                            <div
                                                                key={element._id}
                                                                onClick={() => toggleItem(element)}
                                                                className={`xs:w-[25px] xs:h-[20px] sm:w-[25px] sm:h-[25px] md:w-[30px] md:h-[30px] sm:border-[3px] outline-[2px] md:border-[3px] rounded-full cursor-pointer flex items-center justify-center transition-[.2] ${selectedItems.some(selected => selected.color === el.color)
                                                                    ? ' opacity-50 scale-[.9] border-green-500 border-opacity-100'
                                                                    : 'opacity-100 scale-[1]'
                                                                    }`}
                                                            >
                                                                <div
                                                                    className={`w-[30px] h-[25px] transition-[.2] rounded-[50%] ${selectedItems.some(selected => selected.color === element.color) ? "w-[17px] h-[17px]" : "w-[30px] h-[25px]"}`}
                                                                    style={{ backgroundColor: element.color }}
                                                                ></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {Array.isArray(item.size) && item.size.length > 0 && (
                                                <div className="flex gap-3 xs:items-start xl:items-center">
                                                    <span className="sm:text-[16px] md:text-[18px] whitespace-nowrap font-medium">
                                                        {translation.main.product.size}
                                                    </span>
                                                    <div className="flex xs:flex-wrap xs:gap-[5px] sm:gap-2">
                                                        {item.size.map((el_sec: any) => (
                                                            <div
                                                                key={el_sec._id}
                                                                onClick={() => toggleSize(el_sec)}
                                                                className={`xs:w-[30px] xs:h-[30px] sm:w-[35px] sm:h-[35px] md:w-[45px] md:h-[34px] border border-gray-400 transition-[.2] flex justify-center items-center font-medium text-[16px] rounded-md ${selectedSize.some(selected => selected.size === el.size) ? 'bg-red-500 text-white' : ''}`}
                                                            >
                                                                <p>{el_sec.size.toUpperCase()}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex w-full justify-between">
                                                <div className="flex w-[85%] gap-[5%]">
                                                    <div className="bg-white border flex w-[47.5%] justify-center items-center">
                                                        <button onClick={() => setCount(count - 1)} className="w-[25%] xs:text-[14px] ms:text-ms lg:text-[30px] text-center">
                                                            -
                                                        </button>
                                                        <div className="w-[50%] bg-red-500 flex justify-center items-center py-[9px]">
                                                            <span className="text-white text-[20px]">{count}</span>
                                                        </div>
                                                        <button onClick={() => setCount(count + 1)} className="w-[25%] xs:text-[14px] ms:text-ms lg:text-[30px] text-center">
                                                            +
                                                        </button>
                                                    </div>
                                                    <button onClick={handleProcess} className={"bg-red-500 text-white xs:text-[12px] xs:w-[37%] sm:text-[16px] sm:w-[47.5%] rounded-md px-[5%]"
                                                    }>{translation.main.product.buy}</button>
                                                </div>
                                                <AddToWishlist border={true} id={item._id} />
                                            </div>

                                            <div>
                                                <div className="border border-gray-400  w-[full] px-5 h-[90px] flex items-center gap-5">
                                                    <Image src="/images/delivery.svg" alt="hello" width={40} height={40} />
                                                    <div>
                                                        <h1 className="font-semibold tetx-[18px]">{translation.main.product.free}</h1>
                                                        <span className="underline decoration-slice">{translation.main.product.enter}</span>
                                                    </div>
                                                </div>
                                                <div className="border border-gray-400  w-[full] px-5 h-[90px] flex items-center gap-5">
                                                    <Image src="/images/return.svg" alt="hello" width={40} height={40} />
                                                    <div>
                                                        <h1 className="font-semibold tetx-[18px]">{translation.main.product.return}</h1>
                                                        <span className="underline decoration-slice">{translation.main.product.details}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <RealetedProduct category={el.titles.en} translation={translation} lang={lang} />
                            </div >
                        ) : null
                    )
                )
            )}
        </>
    );
};

export default ProductId;
