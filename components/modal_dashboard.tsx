"use client"

import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';
import { useAppContext } from '@/context';

type Props = {
    button: any
}

const Modal_dashboard: React.FC<Props> = ({ button }) => {

    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "option4", label: "Option 4" },
        { value: "option5", label: "Option 5" },
        { value: "option6", label: "Option 6" },
        { value: "option7", label: "Option 7" },
        { value: "option8", label: "Option 8" },
        { value: "option9", label: "Option 9" },
        { value: "option10", label: "Option 10" },
    ];
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const { dataCat } = useAppContext();

    console.log(dataCat);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    /* const [select1Value, setSelect1Value] = useState<string | null>(null);
    const [select2Value, setSelect2Value] = useState<string | null>(null);
    const [select3Value, setSelect3Value] = useState<string | null>(null);
    const [select4Value, setSelect4Value] = useState<string | null>(null);
    const [select5Value, setSelect5Value] = useState<string | null>(null);

    const handleSelect1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect1Value(event.target.value);
    };

    const handleSelect2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect2Value(event.target.value);
    };

    const handleSelect3Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect1Value(event.target.value);
    };

    const handleSelect4Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect1Value(event.target.value);
    };

    const handleSelect5Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect2Value(event.target.value);
    }; */

    async function onSubmit(e: any) {
        e.preventDefault()


        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            // Проверяем на успешность и корректно обрабатываем ответ
            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.message || "Image upload failed");
                return;
            }

            const data = await response.json();
            setMessage(data.message);



            const fm = new FormData(e.target)

            const product: any = {}

            fm.forEach((val: any, key: any) => (product[key] = val))

            product.image = data.data

            product.titles = {
                ru: product.title_ru,
                en: product.title,
            }

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
                    <form className=" w-[50%] p-[1%] text-black relative  h-fit bg-background rounded-[20px]" onSubmit={onSubmit}>

                        <button onClick={() => setIsOpend(false)}>
                            <Image className='absolute top-[2%] right-[1%] ' src="/images/close.svg" alt="closebtn" width={25} height={25} />
                        </button>

                        <div className="flex w-full gap-[5%]">

                            <div className="w-full flex flex-col gap-[2%]">

                                <div className="w-full">
                                    <label
                                        className="block mb-2 text-sm font-medium text-white"
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
                                        required
                                    />
                                </div>

                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="title">Title</label>
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
                                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="title">Title_ru</label>
                                    <input
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        type="text"
                                        name="title_ru"
                                        id="title_ru"
                                        placeholder="Напишите название продукта"
                                        required
                                    />
                                </div>

                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="price">Price</label>
                                    <input
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        type="text"
                                        name="price"
                                        id="price"
                                        placeholder="Enter product price"
                                        required
                                    />
                                </div>


                            </div>

                            <div className="w-full">

                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="price">discound</label>
                                    <input
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        type="text"
                                        name="discound"
                                        id="discound"
                                        placeholder="Enter product discound"
                                        required
                                    />
                                </div>


                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="description">Description</label>
                                    <textarea
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        name="description"
                                        id="description"
                                        placeholder="Enter product description"
                                        required
                                    />
                                </div>

                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="description">Description ru</label>
                                    <textarea
                                        className="w-full px-4 outline-none py-2 border border-gray-300 rounded-md"
                                        name="description_ru"
                                        id="description_ru"
                                        placeholder="Напишите описание продукта"
                                        required
                                    />
                                </div>

                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="description">Category</label>
                                    <select className='w-full px-4 outline-none py-2 border border-gray-300 rounded-md' name="type" id="type">
                                        <option value="" >None</option>
                                        <option value="Flash Sales" >Flash Sales</option>
                                        <option value="Best Selling Products" >Best Selling Products</option>
                                    </select>
                                </div>


                                <div className='w-full'>
                                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="description">Category</label>
                                    <select className='w-full px-4 outline-none py-2 border border-gray-300 rounded-md' name="category" id="category">
                                        {dataCat.map((item: any) => (
                                            <option key={item._id} value={item.title}>{item.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full mt-[20px] px-4 py-2 bg-orange-600 text-white rounded-md active:scale-[.9] transition-[.2s] hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600"
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