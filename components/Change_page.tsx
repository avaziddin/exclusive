"use client";

import { useAppContext } from "@/context";
import React, { useEffect, useState } from "react";

interface ChangePageProps {
    translation: any;
}

const ChangePage: React.FC<ChangePageProps> = ({ translation }) => {
    const { dataUsers } = useAppContext();
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const cookieStore = document.cookie;
        const userIdCookie = cookieStore
            .split("; ")
            .find((row) => row.startsWith("userId="))
            ?.split("=")[1];

        setUserId(userIdCookie || null);
        setLoading(false);
    }, []);



    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-[50vh]">
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="w-[60px] h-[60px] text-gray-100 animate-spin dark:text-gray-300 fill-gray-200"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            </div>
        );
    }

    const user = Array.isArray(dataUsers)
        ? dataUsers.find((el: any) => el._id === userId)
        : null;

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const form = document.querySelector("form") as HTMLFormElement;
        form.reset();
    };

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fm = new FormData(e.currentTarget);
        const product: Record<string, string> = {};

        fm.forEach((val, key) => (product[key] = val.toString()));

        if (product.password && product.password !== user?.password) {
            alert("Wrong Password");
            return;
        }

        if (product.new_password !== product.new_password_sec) {
            alert("Passwords do not match");
            return;
        }

        product.password = user.new_password

        const res = await fetch(`/api/users/${userId}`, {
            method: "PATCH",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            alert("Data updated successfully!");
        } else {
            alert("Failed to update data");
        }
    }


    return (
        <form onSubmit={onSubmit} className="w-[90%]">
            {/* Main Content */}
            <div className="flex justify-between w-full mt-[80px]">
                {/* Content Area */}
                <div className="py-10 mb-[70px] text-black shadow-xl w-full px-[85px]">
                    <h1 className="text-[27px] text-red-500 font-semibold mb-5">
                        {translation.main.account.edit}
                    </h1>
                    <div className="flex w-full gap-6">
                        {/* Left Column */}
                        <div className="w-full text-[17px] flex flex-col gap-[20px]">
                            <div className="flex w-full flex-col gap-2">
                                <span>{translation.main.account.first}</span>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    className="w-full rounded-md p-[15px] bg-zinc-100 outline-none pl-4"
                                    defaultValue={user?.name}
                                />
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <span>Email {translation.main.account.orphonenumber}</span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Rimelrimel1111@gmail.com or 998915197402"
                                    className="w-full rounded-md p-[15px] bg-zinc-100 outline-none pl-4"
                                    defaultValue={user?.email}
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="w-full text-[17px] flex flex-col gap-[20px]">
                            <div className="flex w-full flex-col gap-2">
                                <span>{translation.main.account.last}</span>
                                <input
                                    type="text"
                                    placeholder="Surname"
                                    name="surname"
                                    className="w-full rounded-md p-[15px] bg-zinc-100 outline-none pl-4"
                                    defaultValue={user?.surname}
                                />
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <span>{translation.main.account.adress}</span>
                                <input
                                    type="text"
                                    placeholder="Kingston, 5236, United State"
                                    name="adress"
                                    className="w-full rounded-md p-[15px] bg-zinc-100 outline-none pl-4"
                                    defaultValue={user?.adress}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="flex flex-col text-[17px] gap-3 mt-[50px]">
                        <h1 className="text-[24px] font-semibold">{translation.main.account.password}</h1>
                        <input
                            type="text"
                            className="w-full p-[15px] outline-none rounded-md bg-zinc-100 pl-4"
                            placeholder="Current Password"
                            name="password"
                        />
                        <input
                            type="text"
                            className="w-full p-[15px] outline-none rounded-md bg-zinc-100 pl-4"
                            placeholder="New Password"
                            name="new_password"
                        />
                        <input
                            type="text"
                            className="w-full p-[15px] outline-none rounded-md bg-zinc-100 pl-4"
                            placeholder="Confirm New Password"
                            name="new_password_sec"
                        />
                        <div className="flex gap-5 justify-end mt-[20px]">
                            <button
                                className="text-[18px] active:scale-[.9] transition-[.2]"
                                onClick={handleCancel}
                            >
                                {translation.main.account.cancel}
                            </button>
                            <button
                                type="submit"
                                className="w-[30%] active:opacity-[.9] active:scale-[.9] transition-[.2s] p-[15px] text-[18px] rounded-md text-white bg-red-500"
                            >
                                {translation.main.account.save}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ChangePage;
