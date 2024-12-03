"use client"

import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

interface Props {
    button: any // Пример структуры перевода
}

const ModalCategory: React.FC<Props> = ({ button }) => {

    async function onSubmit(e: any) {
        e.preventDefault()

            const fm = new FormData(e.target)

            const category: any = {}

            fm.forEach((val: any, key: any) => (category[key] = val))


            category.titles = {
                ru: category.title_ru,
                en: category.title,
            }

            const res = await fetch(`http://localhost:3000/api/category`, {
                method: "POST",
                body: JSON.stringify(category),
                headers: {
                    "Content-Type": "application/json"
                }

            })

            console.log(res);


            if (res.status == 200 || res.status == 201) {
                alert("success")
            }
       
    }



    const [isOpend, setIsOpend] = useState(false)

    useEffect(() => {
        if (isOpend) {
            document.body.style.overflow = 'hidden'; // Отключаем скролл
        } else {
            document.body.style.overflow = ''; // Восстанавливаем скролл
        }

        // Восстанавливаем скролл при размонтировании компонента
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpend]);

    return (
        <>
            <div onClick={() => setIsOpend(true)}>
                {button}
            </div>

            {isOpend && (

                <div
                    className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[55]"
                    style={{
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(10px)"
                    }}>
                    <form className="w-[35%] relative flex-col p-[1%] pt-[2%] space-y-6 text-black bg-background rounded-[20px] shadow-md" onSubmit={onSubmit}>

                        <button className='absolute top-[5%] right-[2%] ' onClick={() => setIsOpend(false)}>
                            <Image src="/images/close.svg" alt="closebtn" width={30} height={30} />
                        </button>

                        <div className="flex flex-col gap-[20px]">

                            <div>
                                <label className="block mb-2 text-black text-[18px] font-medium" htmlFor="image">Category</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter your category"
                                    defaultValue={""}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-black  text-[18px] font-medium" htmlFor="image">Category ru</label>
                                <input
                                    className="w-full px-4 py-2 border  border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    type="text"
                                    name="title_ru"
                                    id="title_ru"
                                    placeholder="Напишите свою категорию"
                                    defaultValue={""}
                                />
                            </div>

                        </div>


                        <button
                            className="w-full text-[18px] px-4 py-2 text-black bg-gray-200 rounded-md hover:bg-gray-300 active:scale-[.9] transition-[.2s] "
                            type="submit"
                        >
                            Add Product
                        </button>
                    </form>


                </div>

            )}



        </>
    );
};

/*  <div

<div className="">
                        <button className='absolute right-[2%] top-[3%]' onClick={() => setIsOpend(false)}>
                            <Image src="/images/close_btn.svg" alt="close_btn" width={30} height={30} />
                        </button>
                        {children}
                    </div>
                </div> */


export default ModalCategory;