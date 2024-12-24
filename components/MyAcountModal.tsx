"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/context";

interface MyAcountModalProps {
    translation: any;
}

const MyAcountModalCom: React.FC<MyAcountModalProps> = ({ translation }) => {
    const { dataUsers } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const cookieStore = document.cookie;
        const userIdCookie = cookieStore
            .split("; ")
            .find((row) => row.startsWith("userId="))
            ?.split("=")[1];

        setUserId(userIdCookie || null);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {Array.isArray(dataUsers) && userId ? (
                dataUsers.map((el: any) => {
                    if (userId === el._id) {
                        return (
                            <div key={el._id} className="relative" ref={modalRef}>
                                <div
                                    onClick={toggleModal}
                                    className="w-[35px] h-[35px] rounded-[50%] overflow-hidden"
                                >
                                    <Image
                                        className="object-cover"
                                        src={el.image ? el.image[0] : "/images/person.svg"}
                                        alt="User avatar"
                                        width={50}
                                        height={50}
                                    />
                                </div>

                                {isOpen && (
                                    <div className="absolute top-14 right-0 bg-gradient-blur backdrop-blur-md text-white shadow-lg rounded-lg w-64 p-4 z-10">
                                        <ul className="flex flex-col gap-5">
                                            <li>
                                                <Link
                                                    href="/change"
                                                    className="group flex items-center text-[17px] gap-3 hover:text-gray-300 transition"
                                                >
                                                    <Image
                                                        src="/images/user_white.svg"
                                                        alt="Manage Account"
                                                        width={25}
                                                        height={20}
                                                        className="group-hover:hidden" // Отображается по умолчанию
                                                    />
                                                    <Image
                                                        src="/images/user_gray.svg"
                                                        alt="Manage Account Hover"
                                                        width={25}
                                                        height={20}
                                                        className="hidden group-hover:block" // Отображается при наведении
                                                    />
                                                    {translation.main.account.modal.manage_acount}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/account/orders"
                                                    className="group flex items-center text-[17px] gap-3 hover:text-gray-300 transition"
                                                >
                                                    <Image
                                                        src="/images/orders_white.svg"
                                                        alt="Manage Account"
                                                        width={25}
                                                        height={20}
                                                        className="group-hover:hidden" // Отображается по умолчанию
                                                    />
                                                    <Image
                                                        src="/images/orders_gray.svg"
                                                        alt="Manage Account Hover"
                                                        width={25}
                                                        height={20}
                                                        className="hidden group-hover:block" // Отображается при наведении
                                                    />
                                                    {translation.main.account.modal.my_order}
                                                </Link>
                                            </li>

                                            <li
                                                className="group flex items-center text-[17px] gap-3 hover:text-gray-300 transition"

                                            >
                                                <button
                                                    className="flex gap-3"
                                                    onClick={() => alert("Logged out!")}
                                                >
                                                    <Image
                                                        src="/images/exit_white.svg"
                                                        alt="Manage Account"
                                                        width={25}
                                                        height={20}
                                                        className="group-hover:hidden" // Отображается по умолчанию
                                                    />
                                                    <Image
                                                        src="/images/exit_gray.svg"
                                                        alt="Manage Account Hover"
                                                        width={25}
                                                        height={20}
                                                        className="hidden group-hover:block" // Отображается при наведении
                                                    />
                                                    {translation.main.account.modal.logout}
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    }
                })
            ) : (
                <p>Loading or no user found</p>
            )}
        </>
    );
};

export default MyAcountModalCom;
