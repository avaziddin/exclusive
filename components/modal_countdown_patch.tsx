"use client";

import { useAppContext } from '@/context';
import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

interface Item {
    alt: string;
    colors: any;
    type: any;
    titles: {
        en: string;
        ru: string;
    };
    description: {
        en: string;
        ru: string;
    };
    composition: {
        en: string;
        ru: string;
    };
    price?: number;
    discound?: number;
    category?: string;
    image?: any;
    countdown?: any;
}

interface ModalProps {
    Button: ReactNode;
    id: string;
    type: any;
}

const Modal_countdown_patch: React.FC<ModalProps> = ({ Button, id, type }) => {
    const [item, setItem] = useState<Item | null>(null);
    const [isOpend, setIsOpend] = useState(false);

    console.log(item);

    async function onSubmit(e: any) {
        e.preventDefault();

        const fm = new FormData(e.target);
        const product: any = {};

        fm.forEach((val: any, key: any) => (product[key] = val));

        const res = await fetch(`http://localhost:3000/api/${type}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(res);

        if (res.status == 200 || res.status == 201) {
            alert("success");
        }
    }

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/${type}/${id}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch item");
                }

                const { data } = await response.json();
                setItem(data);
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while fetching data");
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id, type]);

    useEffect(() => {
        if (isOpend) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpend]);

    return (
        <>
            <div onClick={() => setIsOpend(true)}>
                {Button}
            </div>

            {isOpend && (
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
                    style={{
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <form
                        onSubmit={onSubmit}
                        className={`${type === "category" ? "w-[40%]" : ""} ${type === "product" ? "w-[70%]" : ""} w-[40%] p-[1%] text-black relative h-fit bg-background rounded-[20px]`}
                    >
                        <button onClick={() => setIsOpend(false)} type="button">
                            <Image className="absolute top-[2%] right-[1%]" src="/images/close.svg" alt="closebtn" width={25} height={25} />
                        </button>

                        <div className="flex flex-col w-full gap-[5%]">
                            <div className="flex w-full gap-[2%]">
                                {item?.countdown && (
                                    <div className="flex w-full py-[5%] gap-[5%]">
                                        <div className="w-full">
                                            <label className="block text-sm font-medium text-white" htmlFor="title">
                                                Countdown
                                            </label>
                                            <input
                                                className="w-full px-4 outline-none text-[18px] py-4 border border-gray-300 rounded-md"
                                                type="date"
                                                name="countdown"
                                                id="countdown"
                                                placeholder="Enter countdown"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            className="w-full mt-[20px] px-4 py-2 bg-gray-200 text-black font-medium rounded-md active:scale-[.9] transition-[.2s] hover:bg-gray-300 border-none focus:no-underline outline-none"
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

export default Modal_countdown_patch;
