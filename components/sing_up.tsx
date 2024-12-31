"use client";

import Image from "next/image";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useAppContext } from "@/context";

interface Props {
    translation: any;
}

const Sing_up: React.FC<Props> = ({ translation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const { dataUsers } = useAppContext();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const sortedEmails = dataUsers.map((user: { email: any; }) => user.email).sort();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                setFile(selectedFile);
                const imageUrl = URL.createObjectURL(selectedFile);
            }
        }
    };

    const validateForm = (formData: FormData) => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.get("name")) {
            newErrors["name"] = "Name is required.";
        } else if (!/^[^\d]+$/.test(formData.get("name") as string)) {
            newErrors["name"] = "Invalid name format.";
        }
        if (!formData.get("email")) {
            newErrors["email"] = "Email is required.";
        } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.get("email") as string)) {
            newErrors["email"] = "Invalid email format.";
        }
        if (!formData.get("password")) {
            newErrors["password"] = "Password is required.";
        } else if ((formData.get("password") as string).length < 6) {
            newErrors["password"] = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formElement = e.target as HTMLFormElement;
        const formData = new FormData(formElement);

        if (!validateForm(formData)) {
            return;
        }

        const email = formData.get("email")?.toString();

        // Проверка на существующий email
        const emailExists = sortedEmails.includes(email);

        if (emailExists) {
            setErrors((prev) => ({
                ...prev,
                email: "This email is already registered.",
            }));
            return;
        }

        // Дальнейшая обработка регистрации
        try {
            if (file) {
                formData.append("image", file);
            }

            const uploadResponse = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const uploadData = await uploadResponse.json();

            const product: any = {};
            formData.forEach((val, key) => (product[key] = val));
            product.image = uploadData.data;
            product.wishlist = [];
            product.cart = [];
            product.orders = [];

            const userResponse = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (userResponse.status === 200 || userResponse.status === 201) {
                const userData = await userResponse.json();
                const userId = userData?.data?.insertedId;

                if (userId) {
                    Cookies.set("userId", userId, { expires: 7 });
                    window.location.href = "/";
                    alert("Registration successful!");
                } else {
                    alert("Error: User ID not found.");
                }
            } else {
                const errorData = await userResponse.json();
                alert(`Registration failed: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.log("Something went wrong:", error);
        }
    }

    return (
        <form className="flex text-[18px] flex-col gap-4 p-4 sm:p-6 lg:p-8" onSubmit={onSubmit}>
            <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-black" htmlFor="image">
                    {translation.main.sign_up.image}
                </label>
                <input
                    className="w-full border-b-[2px] border-gray-100  text-gray-700 rounded-lg cursor-pointer file:w-full sm:file:w-[70%] lg:file:w-[40%] file:p-[2%] file:mr-4 file:h-full file:rounded-lg file:border-0 file:font-medium file:bg-gray-100 file:text-black hover:file:bg-blue-100"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="image"
                    id="image"
                />
            </div>

            <div>
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className={`w-full pl-[2%] border-[1px] rounded-lg border-gray-400 text-black py-[1vh] outline-none ${errors.name ? "border-red-500" : "border-gray-400"
                        }`}
                />
                <hr />
            </div>

            <div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={`w-full pl-[2%] border-[1px] rounded-lg border-gray-400 text-black py-[1vh] outline-none ${errors.email ? "border-red-500" : "border-gray-400"
                        }`}
                />
                <hr />
            </div>

            <div>
                <div className="relative">
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`w-full pl-[2%] border-[1px] rounded-lg       border-gray-400 text-black py-[1vh] outline-none ${errors.password ? "border-red-500" : "border-gray-400"
                            }`}
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
                className="w-full border-none sm:w-[85%] lg:w-[75%] text-[18px] m-auto py-[3%] text-white transition-[.2] font-normal bg-red-500 rounded-xl active:scale-[.9] active:opacity-[.9]"
            >
                {translation.main.sign_up.create}
            </button>
        </form>
    );
};

export default Sing_up;
