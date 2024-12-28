"use client";

import Image from "next/image";
import React, { useState } from "react";
import Cookies from "js-cookie";

interface Props {
    translation: any;
}

const Sing_up: React.FC<Props> = ({ translation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                setFile(selectedFile);
                const imageUrl = URL.createObjectURL(selectedFile);
                setImageUrl(imageUrl);
            }
        }
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
    
        // Приводим e.target к HTMLFormElement
        const formElement = e.target as HTMLFormElement;
    
        const formData = new FormData(formElement);
        if (file) {
            formData.append("image", file);
        }
    
        try {
            // Загружаем изображение
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            
            const data = await response.json();
            console.log("Image upload response:", data); // Логируем ответ на загрузку изображения
    
            const fm = new FormData(formElement);
            const product: any = {};
    
            fm.forEach((val: any, key: any) => (product[key] = val));
    
            product.image = data.data; // Получаем URL изображения из ответа API

            product.wishlist = []
    
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (res.status === 200 || res.status === 201) {
                const userData = await res.json();
                console.log("Product creation response:", userData);
    
                const userId = userData?.data?.insertedId;
    
                if (userId) {
                    Cookies.set("userId", userId, { expires: 7 });
                    window.location.href = "/";
                    alert("Registration successful!");
                } else {
                    alert("Error: User ID not found.");
                }
            } else {
                const errorData = await res.json();
                alert(`Registration failed: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.log("Something went wrong:", error);
        }
    }
    

    return (
        <form className="flex text-[18px] flex-col gap-4" onSubmit={onSubmit}>
            <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-black" htmlFor="image">
                    {translation.main.sign_up.image}
                </label>
                <input
                    className="w-full border-b-[2px] border-gray-100 text-gray-700 rounded-lg cursor-pointer file:w-[40%] file:p-[2%] file:mr-4 file:h-full file:rounded-lg file:border-0 file:font-medium file:bg-gray-100 file:text-black hover:file:bg-blue-100"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image"
                    id="image"
                />
            </div>

            <div>
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="pl-[2%] text-black py-[1vh] outline-none"
                />
                <hr />
            </div>
            <div>
                <input
                    name="email"
                    type="email"
                    placeholder="Email or Phone Number"
                    className="w-full pl-[2%] text-black py-[1vh] outline-none"
                />
                <hr />
            </div>
            <div>
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pl-[2%] text-black py-[1vh] outline-none w-full"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-[2%] top-[50%] translate-y-[-50%] text-sm text-gray-600 hover:text-gray-800"
                    >
                        <Image
                            className="opacity-[.8]"
                            src={showPassword ? "/images/open_eye.svg" : "/images/close_eye.svg"}
                            alt="eye"
                            width={25}
                            height={25}
                        />
                    </button>
                </div>
                <hr />
            </div>
            <button
                type="submit"
                className="w-[75%] text-[18px] m-auto py-[3%] text-white transition-[.2] font-normal bg-red-500 rounded-xl active:scale-[.9] active:opacity-[.9]"
            >
                {translation.main.sign_up.create}
            </button>
        </form>
    );
};

export default Sing_up;
