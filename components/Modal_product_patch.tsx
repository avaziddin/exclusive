"use client";

import { useAppContext } from '@/context';
import Image from 'next/image';
import { describe } from 'node:test';
import React, { ReactNode, useEffect, useState } from 'react';

interface Item {
    alt: string;
    colors: any;
    type: any
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
    // Укажите тип по необходимости
    price?: number; // Укажите тип по необходимости
    discound?: number; // Укажите тип по необходимости
    category?: string;
    image?: any
}

interface ModalProps {
    Button: ReactNode;
    id: string;
    type: any
}





const Modal_product_patch: React.FC<ModalProps> = ({ Button, id, type }) => {
    const [item, setItem] = useState<Item | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isOpend, setIsOpend] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const { dataCat } = useAppContext();
    const [selectedColors, setSelectedColors] = useState<any[]>([]);

    const colorObjects = [
        { _id: "1", color: "rgba(255, 0, 0, 1)", name: { en: "Red", ru: "Красный" } },
        { _id: "2", color: "rgba(0, 255, 0, 1)", name: { en: "Green", ru: "Зеленый" } },
        { _id: "3", color: "rgba(0, 0, 255, 1)", name: { en: "Blue", ru: "Синий" } },
        { _id: "4", color: "rgba(255, 255, 0, 1)", name: { en: "Yellow", ru: "Желтый" } },
        { _id: "5", color: "rgba(255, 165, 0, 1)", name: { en: "Orange", ru: "Оранжевый" } },
        { _id: "6", color: "rgba(255, 255, 255, 1)", name: { en: "White", ru: "Белый" } },
        { _id: "7", color: "rgba(255, 192, 203, 1)", name: { en: "Pink", ru: "Розовый" } },
        { _id: "8", color: "rgba(139, 69, 19, 1)", name: { en: "Brown", ru: "Коричневый" } },
        { _id: "9", color: "rgba(128, 128, 128, 1)", name: { en: "Gray", ru: "Серый" } },
        { _id: "10", color: "rgba(0, 0, 0, 1)", name: { en: "Black", ru: "Черный" } },
    ];

    const types = [
        { _id: "2", title: "Flash Sales" },
        { _id: "3", title: "None" }
    ]


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };


    const toggleItem = (el: any) => {
        setSelectedColors((prev) => {
            // Проверяем, есть ли элемент уже в массиве
            if (prev.find((i) => i._id === el._id)) {
                // Если есть, удаляем его
                return prev.filter((i) => i._id !== el._id);
            } else {
                // Если нет, добавляем
                return [...prev, el];
            }
        });
    };




    async function onSubmit(e: any) {
        e.preventDefault();

        try {
            const product: any = {};
            const fm = new FormData(e.target);

            fm.forEach((val: any, key: any) => (product[key] = val));

            // Если файл для загрузки присутствует
            if (file) {
                const formData = new FormData();
                formData.append("image", file);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setMessage(errorData.message || "Image upload failed");
                    return;
                }

                const data = await response.json();
                product.image = data.data; // Устанавливаем URL загруженного изображения
            } else {
                // Если файла нет, используем текущее изображение
                product.image = item?.image || null;
            }

            // Формируем другие данные
            product.titles = product.title_ru && product.title
                ? {
                    ru: product.title_ru,
                    en: product.title,
                }
                : item?.titles;

            product.composition = product.composition_ru && product.composition
                ? {
                    ru: product.composition_ru,
                    en: product.composition,
                }
                : item?.composition;

            product.colors = selectedColors

            product.description = product.description_ru && product.description
                ? {
                    ru: product.description_ru,
                    en: product.description,
                }
                : item?.description;

            // Выполняем запрос PATCH
            const res = await fetch(`http://localhost:3000/api/${type}/${id}`, {
                method: "PATCH",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200 || res.status === 201) {
                alert("Success");
            } else {
                const errorData = await res.json();
                setMessage(errorData.message || "Update failed");
            }
        } catch (error) {
            setMessage("Something went wrong: " + message);
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

                if (data?.colors) {
                    setSelectedColors(data.colors); // обновляем selectedColors здесь
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while fetching data");
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id, type]);


    console.log(selectedColors);

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
                        backdropFilter: "blur(10px)"
                    }}>
                    <form onSubmit={onSubmit} className="w-[50%] p-[1%] text-black relative h-fit bg-background rounded-[20px]">
                        <button onClick={() => setIsOpend(false)} type="button">
                            <Image className='absolute top-[2%] right-[1%]' src="/images/close.svg" alt="closebtn" width={25} height={25} />
                        </button>

                        <div className="flex w-full gap-[5%]">
                            <div className="w-full flex flex-col gap-[2%]">
                                {item?.image &&
                                    <div className="w-full">
                                        <label
                                            className="block mb-2 text-sm font-medium text-black"
                                            htmlFor="image"
                                        >
                                            Upload Images
                                        </label>
                                        <input
                                            className="w-full  text-black  bg-gray-50 border border-gray-300 rounded-lg cursor-pointer file:w-[40%] file:p-3 file:mr-4 file:h-full file:rounded-lg file:border-0 file:font-medium file:bg-gray-300 file:text-black hover:file:bg-blue-100"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            name="image"
                                            id="image"
                                        />
                                    </div>
                                }

                                {item?.description &&
                                    <div className="">

                                        <div className="flex mb-[10px] justify-center w-fit flex-wrap h-fit mt-[20px] bg-gray-100 p-[10px] rounded-lg pt-[15px] pr-[15%] pl-[10px] gap-[50%]">
                                            {colorObjects.map((colorItem: any) => (
                                                <div
                                                    key={colorItem._id}
                                                    onClick={() => toggleItem(colorItem)}
                                                    className={`w-[25px] h-[25px] mb-[15px] rounded-full border ${selectedColors.some((color) => color.color === colorItem.color)
                                                        ? 'outline-[3px] outline outline-offset-4 outline-green-500'
                                                        : ''
                                                        }`}
                                                    style={{ backgroundColor: colorItem.color }}
                                                >
                                                    {colorItem.name?.en && (
                                                        <p className="text-[16px] ml-[40px] text-black">{colorItem.name.en}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className='w-full'>
                                            <label className="block mb-2 text-sm font-medium text-white" htmlFor="description">Type</label>
                                            <select className='w-full px-4 outline-none py-2 border border-gray-300 rounded-md' name="type" id="type">
                                                <option value={item?.type}>{item?.type}</option>
                                                {types
                                                    .filter((el: any) => el.title !== item?.type) // Исключаем текущую категорию
                                                    .map((el: any) => (
                                                        <option key={el._id} value={el.title}>{el.title}</option>
                                                    ))}
                                            </select>
                                        </div>

                                        <div className='w-full'>
                                            <label className="block mb-2 text-sm font-medium text-white" htmlFor="description">Category</label>
                                            <select className='w-full px-4 outline-none py-2 border border-gray-300 rounded-md' name="category" id="category">
                                                <option value={item?.category}>{item?.category}</option>

                                                {dataCat
                                                    .filter((el: any) => el.title !== item?.category) // Исключаем текущую категорию
                                                    .map((el: any) => (
                                                        <option key={el._id} value={el.title}>{el.title}</option>
                                                    ))}
                                            </select>
                                        </div>



                                    </div>
                                }



                                {
                                    item?.alt &&
                                    <div className='w-full'>
                                        <label className="block mb-2 text-sm font-medium text-white" htmlFor="title">Title</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            type="text"
                                            name="alt"
                                            id="alt"
                                            placeholder="Enter product title"
                                            defaultValue={item?.alt || ''}
                                        />
                                    </div>
                                }

                            </div>


                            <div className="w-full">



                                {
                                    item?.titles &&
                                    <div className="">

                                        <div className='w-full mb-[10px]'>
                                            <label className="block mb-2 text-sm font-medium text-black" htmlFor="title">Title</label>
                                            <input
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                type="text"
                                                name="title"
                                                id="title"
                                                placeholder="Enter product title"
                                                defaultValue={item?.titles?.en || ''}
                                            />
                                        </div>

                                        <div className='w-full mb-[10px]'>
                                            <label className="block mb-2 text-sm font-medium text-black" htmlFor="title_ru">Title RU</label>
                                            <input
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                type="text"
                                                name="title_ru"
                                                id="title_ru"
                                                placeholder="Напишите название продукта"
                                                defaultValue={item?.titles?.ru || ''}
                                            />
                                        </div>

                                    </div>
                                }

                                {item?.price &&
                                    <div className='w-full mb-[10px]'>
                                        <label className="block mb-2 text-sm font-medium text-black" htmlFor="price">Price ($)</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            type="text"
                                            name="price"
                                            id="price"
                                            placeholder="Enter product price"
                                            defaultValue={item?.price || ''}
                                        />
                                    </div>
                                }

                                {item?.discound &&
                                    <div className='w-full mb-[10px]'>
                                        <label className="block mb-2 text-sm font-medium text-black" htmlFor="price">Price ($)</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            type="text"
                                            name="discound"
                                            id="discound"
                                            placeholder="Enter product price"
                                            defaultValue={item?.discound || ''}
                                        />
                                    </div>
                                }

                                {item?.description &&
                                    <div className="">





                                        <div className='w-full'>
                                            <label className="block mb-2 text-sm font-medium text-black" htmlFor="description">Description</label>
                                            <textarea
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                name="description"
                                                id="description"
                                                placeholder="Enter product description"
                                                defaultValue={item?.description?.en || ''}
                                            />
                                        </div>

                                        <div className='w-full'>
                                            <label className="block mb-2 text-sm font-medium text-black" htmlFor="description">Description</label>
                                            <textarea
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                name="description_ru"
                                                id="description_ru"
                                                placeholder="Enter product description"
                                                defaultValue={item?.description?.ru || ''}
                                            />
                                        </div>
                                    </div>
                                }


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

export default Modal_product_patch;
