"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с cookie
import { useAppContext } from '@/context';

interface Props {
    translation: any;
}

const Login_form: React.FC<Props> = ({ translation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { dataUsers } = useAppContext();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const validateForm = (email: string, password: string) => {
        const newErrors: { [key: string]: string } = {};

        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fm = new FormData(e.currentTarget);

        const email = fm.get("email") as string;
        const password = fm.get("password") as string;

        if (!validateForm(email, password)) {
            return;
        }

        try {
            const user = {
                email,
                password,
            };

            // Найти пользователя в массиве
            const foundUser = dataUsers.find(
                (el: any) => el.email === user.email && el.password === user.password
            );

            if (foundUser) {
                Cookies.set('userId', foundUser._id, { expires: 7 }); // Установить cookie
                alert("Login successful!");
                window.location.href = "/";
            } else {
                // Проверяем, какой из параметров неверен, и добавляем соответствующую ошибку
                if (!dataUsers.find((el: any) => el.email === user.email)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: "Email is incorrect.",
                    }));
                }

                if (!dataUsers.find((el: any) => el.password === user.password)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        password: "Password is incorrect.",
                    }));
                }
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }

    return (
        <form className="flex flex-col gap-4 text-[16px] sm:text-[18px] w-full px-4 sm:px-6 lg:px-8" onSubmit={onSubmit}>
            {/* Поле ввода Email или телефона */}
            <div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <input
                    name="email"
                    type="email"
                    placeholder="Email or Phone Number"
                    className={`w-full pl-[2%] py-[1vh] border-[1px] rounded-lg text-black outline-none border-gray-300 focus:border-gray-500 transition-all ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                <hr />
            </div>

            {/* Поле ввода пароля */}
            <div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`w-full pl-[2%] border-[1px] rounded-lg py-[1vh] text-black outline-none border-b border-gray-300 focus:border-gray-500 transition-all ${errors.password ? "border-red-500" : "border-gray-300"}`}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-[2%] top-[50%] translate-y-[-50%] text-gray-600 hover:text-gray-800 transition-opacity"
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
                <hr className="mb-6 sm:mb-[3vh]" />
            </div>

            {/* Кнопка и ссылка */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <button
                    className="w-full sm:w-[50%] py-2 sm:py-[3%] text-white bg-red-500 rounded-lg transition-transform active:scale-95"
                >
                    {translation.main.login.login}
                </button>
                <span className="text-red-500 text-center sm:text-left">{translation.main.login.password}</span>
            </div>
        </form>
    );
};

export default Login_form;
