"use client"

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
    const { dataProd, dataCat } = useAppContext();
    const [count, setCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);

    // Устанавливаем первый элемент в качестве выбранного
    useEffect(() => {
        if (Array.isArray(dataProd)) {
            const product = dataProd.find((item: any) => item._id === id);

            if (product) {
                // Устанавливаем первый цвет
                if (Array.isArray(product.colors) && product.colors.length > 0) {
                    setSelectedItems([product.colors[0]]);
                }

                // Устанавливаем первый размер
                if (Array.isArray(product.size) && product.size.length > 0) {
                    setSelectedSize([product.size[0]]);
                }
            }
        }
    }, [dataProd, id]);

    const toggleSize = (item: any) => {
        setSelectedSize([item]); // Оставляем только выбранный элемент
    };

    const toggleItem = (item: any) => {
        setSelectedItems([item]); // Оставляем только выбранный элемент
    };

    if (count > 20) setCount(9);
    if (count < 1) setCount(1);

    return (
        <>
            {Array.isArray(dataProd) &&
                dataProd.map((item: any) =>
                    Array.isArray(dataCat) &&
                    dataCat.map((el: any) =>
                        item._id === id && item.category === el.titles.en ? (
                            <div key={item._id} className="">
                                <div className="mb-[15vh]">
                                    <div className="mt-[30px]">
                                        <p className="flex gap-[.5%] text-gray-400 text-[20px]">
                                            <span>/</span>
                                            {el.titles[lang]}
                                            <span className="text-black">/</span>
                                            <span className="text-black">{item.titles?.[lang]}</span>
                                        </p>
                                    </div>

                                    <div className="flex h-fit w-full justify-between mt-[80px]">
                                        <div className="w-[67%] h-[73vh] overflow-hidden flex gap-[3vh]">
                                            <div className="flex w-[25%] flex-col justify-between gap-[1vh]">
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

                                            <div className="w-[73%] h-full">
                                                <Image
                                                    className="object-cover w-full h-full rounded-md"
                                                    src={item.image[0]}
                                                    alt="Main image"
                                                    width={700}
                                                    height={700}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-[2vh] w-[30%] text-black justify-between">
                                            <h1 className="text-[35px] font-semibold">{item.titles[lang]}</h1>
                                            <div className="flex gap-4 items-center">
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
                                                <span className="text-black text-[25px]">${item.discound > 0 ? (item.price - (item.price * item.discound) / 100) : item.price}</span>
                                                <span className="text-gray-500 text-[20px] line-through">{item.discound > 0 ? item.price : ""}</span>
                                            </div>

                                            <div className="w-full break-words">
                                                <span>{item.description[lang]}</span>
                                            </div>
                                            <div className="w-full h-[2px] bg-gray-300"></div>

                                            {Array.isArray(item.colors) && item.colors.length > 0 && (
                                                <div className="flex gap-3 items-center">
                                                    <span className="text-[18px] font-medium">
                                                        {translation.main.product.colors}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        {item.colors.map((el: any) => (
                                                            <div
                                                                key={el._id}
                                                                onClick={() => toggleItem(el)}
                                                                className={`w-[30px] h-[30px] border-[3px] rounded-full cursor-pointer flex items-center justify-center transition-[.2] ${selectedItems.some(selected => selected.color === el.color)
                                                                    ? ' border-black'
                                                                    : 'border-gray-300'
                                                                    }`}
                                                            >
                                                                <div
                                                                    className={`w-[30px] h-[25px] transition-[.2] rounded-[50%] ${selectedItems.some(selected => selected.color === el.color) ? "w-[17px] h-[17px]" : "w-[30px] h-[25px]"}`}
                                                                    style={{ backgroundColor: el.color }}
                                                                ></div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {Array.isArray(item.size) && item.size.length > 0 && (
                                                <div className="flex gap-3 items-center">
                                                    <span className="text-[18px] font-medium">
                                                        {translation.main.product.size}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        {item.size.map((el: any) => (
                                                            <div
                                                                key={el._id}
                                                                onClick={() => toggleSize(el)}
                                                                className={`w-[45px] h-[34px] border border-gray-400 transition-[.2] flex justify-center items-center font-medium text-[16px] rounded-md ${selectedSize.some(selected => selected.size === el.size) ? 'bg-red-500 text-white' : ''}`}
                                                            >
                                                                <p>{el.size.toUpperCase()}</p>
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
                                                    <button className="text-white w-[47.5%] bg-red-500 rounded-md px-[5%]">{translation.main.product.buy}</button>
                                                </div>
                                                    <AddToWishlist border={true} id={item._id}/>
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
                            </div>
                        ) : null
                    )
                )}
        </>
    );
};

export default ProductId;
