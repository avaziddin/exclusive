"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с cookie
import { log } from 'console';

interface Props {
    translation: any;
}

const Sing_up: React.FC<Props> = ({ translation }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    async function onSubmit(e: any) {
        e.preventDefault();
        try {
            const fm = new FormData(e.target);

            const user: any = {};

            fm.forEach((val: any, key: any) => (user[key] = val));

            const res = await fetch(`http://localhost:3000/api/users`, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                const data = await res.json(); // Получаем JSON-ответ с сервера
                const userId = data.data.insertedId; // Предполагается, что сервер возвращает id зарегистрированного пользователя
                
                console.log(data);
                
                window.location.href = "/";
                // Устанавливаем cookie с ID пользователя
                Cookies.set('userId', userId, { expires: 7 }); // Cookie будет действовать 7 дней
                alert("Registration successful!");
            } else {
                alert("Registration failed!");
            }
        } catch (error) {
            console.log("Something went wrong: " + error);
        }
    }

    return (
        <>
            <form className="flex text-[18px] flex-col gap-4" onSubmit={onSubmit}>
                <div>
                    <input name="name" type="text" placeholder="Name" className="pl-[2%] text-black py-[1vh]  outline-none" />
                    <hr />
                </div>
                <div>
                    <input name="email" type="email" placeholder="Email or Phone Number" className="w-full pl-[2%] text-black py-[1vh]  outline-none" />
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
                            <Image className='opacity-[.8]' src={showPassword ? "/images/open_eye.svg" : "/images/close_eye.svg"} alt="eye" width={25} height={25} />
                        </button>
                    </div>
                    <hr />
                </div>
                <button type="submit" className="w-[75%] text-[18px] m-auto py-[3%] text-white transition-[.2] font-normal bg-red-500 rounded-xl active:scale-[.9] active:opacity-[.9]">
                    {translation.main.sign_up.create}
                </button>
            </form>
        </>
    );
};

export default Sing_up;
