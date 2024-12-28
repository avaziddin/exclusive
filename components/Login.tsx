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
    const { dataUsers } = useAppContext("")

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const fm = new FormData(e.currentTarget);

            const user = {
                email: fm.get("email") as string,
                password: fm.get("password") as string,
                avatar: fm.get("password") as string,
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
                alert("Invalid email or password!");
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }


    return (
        <>
            <form className="flex text-[18px] flex-col gap-4" onSubmit={onSubmit}>
                <div>
                    <input name="email" type="email" placeholder="Email or Phone Number" className="pl-[2%] text-black py-[1vh] w-full outline-none" />
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
                    <hr className='mb-[3vh]' />

                    <div className="flex w-full justify-between items-center">
                        <button className="bg-red-500 w-[50%] py-[3%] text-white rounded-lg">{translation.main.login.login}</button>
                        <span className="text-red-500">{translation.main.login.password}</span>
                    </div>
                </div>
            </form>
        </>
    );
};
export default Login_form;
