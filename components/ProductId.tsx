"use client";

import { useAppContext } from '@/context';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Count_Modal from './count_modal';

interface ProductIdProps {
    id: string;
    lang: any;
    translation: any;
}

const ProductId: React.FC<ProductIdProps> = ({ id, lang, translation }) => {
    const { dataProd, dataCat } = useAppContext();
    const [count, setCount] = useState(1)

    if (count > 20) {
        setCount(9)
    }
    if (count < 1) {
        setCount(1)
    }

    return (
        <>
            {Array.isArray(dataProd) &&
                dataProd.map((item: any) =>
                    Array.isArray(dataCat) &&
                    dataCat.map((el: any) =>
                        item._id === id && item.category === el.titles.en ? ( // Исправлено на &&
                            <div key={item._id} className="">

                                <div className="mt-[30px]">
                                    <p className='flex gap-[.5%] text-gray-400 text-[20px]'>
                                        <span>/</span>
                                        {el.titles[lang]}
                                        <span className='text-black'>/</span>
                                        <span className='text-black'>
                                            {item.titles?.[lang]}
                                        </span>
                                    </p>

                                </div>



                                <div className="flex h-fit w-full justify-between mt-24">
                                    <div className="w-[67%] h-[73vh] flex gap-[3%]">

                                        <div className="flex w-[25%] flex-col justify-between">
                                            <div className="w-full">
                                                <Image className='w-full' src={item.image[1]} alt="hello" width={200} height={200} />
                                            </div>
                                            <div className="w-full">
                                                <Image className='w-full' src={item.image[2]} alt="hello" width={200} height={200} />
                                            </div>
                                            <div className="w-full">
                                                <Image className='w-full' src={item.image[3]} alt="hello" width={200} height={200} />
                                            </div>
                                            <div className="w-full">
                                                <Image className='w-full' src={item.image[4]} alt="hello" width={200} height={200} />
                                            </div>
                                        </div>

                                        <div className="w-[73%] ">
                                            <Image className='object-cover w-full h-full' src={item.image[0]} alt="hello" width={700} height={700} />
                                        </div>
                                    </div>


                                    <div className="flex flex-col  gap-[2vh] w-[30%] text-black justify-between">
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
                                            <span className="text-[16px] text-gray-400">(150 Reviews)    </span>
                                            <span className="text-gray-400">|</span>
                                            <span className="text-green-400">In Stock</span>
                                        </div>
                                        <div className="flex gap-[2%] items-center">
                                            <span className="text-black text-[25px]">${item.discound > 0 ? (item.price - (item.price * item.discound) / 100) : item.price}</span>
                                            <span className="text-gray-500 text-[20px] line-through">{item.discound > 0 ? item.price : ""}</span>

                                        </div>

                                        <div className="w-full break-words">
                                            <span >{item.description[lang]}</span>
                                        </div>
                                        <div className="w-full h-[2px] bg-gray-300"></div>
                                        <div className="flex gap-3">
                                            <span className='text-[18px]'>{translation.main.product.colors}</span>
                                            <div className="flex gap-3">
                                                {Array.isArray(item.colors) &&
                                                    item.colors.map((el: any) => (
                                                        <div key={el._id}
                                                            className={`w-[22px] h-[22px] border rounded-[50%] `}
                                                            style={{ backgroundColor: el.color }}
                                                        >

                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="w-full flex items-center gap-5">
                                            <span className='text-[18px]'>{translation.main.product.size}</span>
                                            <div className="w-[10%] h-[34px] border border-gray-400 flex justify-center items-center font-semibold text-[15px] rounded-md">XS</div>
                                            <div className="w-[10%] h-[34px] border border-gray-400 flex justify-center items-center font-semibold text-[15px] rounded-md">S</div>
                                            <div className="w-[10%] h-[34px] border  flex justify-center items-center font-semibold text-[15px] bg-red-500 rounded-md">M</div>
                                            <div className="w-[10%] h-[34px] border border-gray-400 flex justify-center items-center font-semibold text-[15px] rounded-md">L</div>
                                            <div className="w-[10%] h-[34px] border border-gray-400 flex justify-center items-center font-semibold text-[15px] rounded-md">XL</div>
                                        </div>
                                        <div className="flex w-full justify-between">
                                            <div className="flex w-[75%] gap-[5%]">
                                                <div className="bg-white border flex w-[47.5%] justify-center items-center">
                                                    <button onClick={() => setCount(count - 1)} className="w-[25%] xs:text-[14px] ms:text-ms lg:text-[30px]   text-center ">
                                                        -
                                                    </button>
                                                    <div className="w-[50%] bg-red-500 flex justify-center items-center py-[9px]">
                                                        <span className='text-white text-[20px]'>{count}</span>
                                                    </div>
                                                    <button onClick={() => setCount(count + 1)} className="w-[25%] xs:text-[14px] ms:text-ms lg:text-[30px]  text-center">
                                                        +
                                                    </button>
                                                </div>
                                                <button className="text-white w-[47.5%] bg-red-500 rounded-md px-[5%]">{translation.main.product.buy}</button>
                                            </div>
                                            <div className="border border-gray-400 rounded-md w-[10%] flex justify-center items-center"><Image src="/images/like.svg" alt="hello" width={30} height={30} /></div>
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



                            </div >
                        ) : null
                    )
                )}
        </>
    );
};


export default ProductId;
