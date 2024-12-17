"use client"

import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';
import { useAppContext } from '@/context';

type Props = {
    button: any
}

const Modal_dashboard: React.FC<Props> = ({ button }) => {

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

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [file, setFile] = useState<File[]>([]);  // Обновленный тип состояния
    const [image, setImage] = useState<string[]>([]);  // Массив строк для URL
    const [message, setMessage] = useState("");
    const { dataCat } = useAppContext();
    const [selectedItems, setSelectedItems] = useState<any[]>([]);


    const toggleItem = (item: any) => {
        setSelectedItems((prev) => {
            // Проверяем, есть ли элемент уже в массиве
            if (prev.find((i) => i._id === item._id)) {
                // Если есть, удаляем его
                return prev.filter((i) => i._id !== item._id);
            } else {
                // Если нет, добавляем
                return [...prev, item];
            }
        });


    };
    console.log(selectedItems);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            // Преобразуем FileList в массив
            const filesArray = Array.from(event.target.files);

            // Проверяем, чтобы не было выбрано больше 5 файлов
            if (filesArray.length + selectedFiles.length === 5) {
                setFile(filesArray);  // Сохраняем массив файлов в состоянии
                setImage(filesArray.map(file => URL.createObjectURL(file)));  // Генерируем превью
            } else {
                alert("You must upload 5 photos");
            }
        }
    };

    console.log(file);

    async function onSubmit(e: any) {
        e.preventDefault()


        if (file.length === 0) {
            setMessage("Please select a file.");
            alert("Please select 5 files.");
            return;
        }

        const formData = new FormData();
        // Добавляем каждый файл из массива в FormData
        file.forEach((fileItem) => {
            formData.append("image", fileItem);  // Пример добавления
        });

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            // Проверяем на успешность и корректно обрабатываем ответ
            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.message || "Image upload failed");
                alert("Image upload failed")
                return;
            }

            const data = await response.json();
            setMessage(data.message);

            console.log(data.data);




            const fm = new FormData(e.target)

            const product: any = {}

            fm.forEach((val: any, key: any) => (product[key] = val))

            product.image = data.data

            product.titles = {
                ru: product.title_ru,
                en: product.title,
            }

            product.colors = selectedItems

            product.description = {
                ru: product.description_ru,
                en: product.description,
            }


            const res = await fetch(`http://localhost:3000/api/product`, {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json"
                }

            })

            console.log(res);

            if (res.status == 200 || res.status == 201) {
                alert("success")
            }

        } catch (error) {
            setMessage("Something went wrong: " + error);
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
                    <form className=" w-[70%] p-[1%] text-black relative  h-fit  bg-background rounded-[20px]" onSubmit={onSubmit}>

                        <button onClick={() => { setIsOpend(false); setSelectedItems([]) }}>
                            <Image className='absolute top-[2%] right-[1%] ' src="/images/close.svg" alt="closebtn" width={25} height={25} />
                        </button>

                        <div className="flex w-full gap-[5%]">

                            <div className="w-full flex flex-col gap-[2%]">

                                <div className="w-full">
                                    <label
                                        className="block mb-2 text-sm font-medium text-black"
                                        htmlFor="image"
                                    >
                                        Upload Image
                                    </label>
                                    <input
                                        className="w-full  text-black  bg-gray-50 border border-gray-300 rounded-lg cursor-pointer file:w-[40%] file:p-3 file:mr-4 file:h-full file:rounded-lg file:border-0 file:font-medium file:bg-gray-300 file:text-black hover:file:bg-blue-100"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        name="image"
                                        id="image"
                                        multiple
                                        required
                                    />
                                </div>








                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-black" htmlFor="title">Title</label>
                                    <input
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter product title"
                                        required
                                    />
                                </div>

                                <div className='w-full'>
                                    <label className="block text-sm font-medium text-black" htmlFor="title">Title_ru</label>
                                    <input
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        type="text"
                                        name="title_ru"
                                        id="title_ru"
                                        placeholder="Напишите название продукта"
                                        required
                                    />
                                </div>



                                <div className="flex flex-col flex-wrap h-[20vh] mt-[20px] bg-gray-100 p-[10px] rounded-lg pt-[15px] w-full pl-[10px] gap-[25px]">
                                    {colorObjects.map((item) => (
                                        <div
                                            key={item._id}
                                            onClick={() => toggleItem(item)}
                                            className={`w-[25px] border ${selectedItems.some(selectedItem => selectedItem._id === item._id) ? 'outline-[2px] outline outline-offset-4 outline-green-500' : ''} h-[25px] rounded-[50%]`}
                                            style={{ background: item.color }}
                                        >
                                            <p className='pl-[40px]'>{item.name.en}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full">


                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-black" htmlFor="price">Price</label>
                                    <input
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        type="number"
                                        name="price"
                                        id="price"
                                        placeholder="Enter product price"
                                        required
                                    />
                                </div>

                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-black" htmlFor="price">discound</label>
                                    <input
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        type="number"
                                        name="discound"
                                        id="discound"
                                        placeholder="Enter product discound"
                                        defaultValue={0}
                                        required
                                    />
                                </div>


                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-black" htmlFor="description">Description</label>
                                    <textarea
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        name="description"
                                        id="description"
                                        placeholder="Enter product description"
                                        required
                                        maxLength={150}  // Ограничение в 50 символов
                                    />
                                </div>

                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-black" htmlFor="description_ru">Description ru</label>
                                    <textarea
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        name="description_ru"
                                        id="description_ru"
                                        placeholder="Напишите описание продукта"
                                        required
                                        maxLength={150}  // Ограничение в 50 символов
                                    />
                                </div>


                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-black" htmlFor="description">Category</label>
                                    <select className='w-full px-4 outline-none py-2 border border-gray-300 rounded-md' name="type" id="type">
                                        <option value="None" >None</option>
                                        <option value="Flash Sales" >Flash Sales</option>
                                    </select>
                                </div>


                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-black" htmlFor="description">Category</label>
                                    <select className='w-full px-4 outline-none py-2 border border-gray-300 rounded-md' name="category" id="category">
                                        {dataCat.map((item: any) => (
                                            <option key={item._id} value={item.title}>{item.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full mt-[20px] px-4 py-2 bg-gray-200 text-black rounded-md active:scale-[.9] transition-[.2s] hover:bg-gray-300 "
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

export default Modal_dashboard;