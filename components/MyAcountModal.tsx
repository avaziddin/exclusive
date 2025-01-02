"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/context";

interface MyAcountModalProps {
  translation: any;
}

const MyAcountModalCom: React.FC<MyAcountModalProps> = ({ translation }) => {
  const { dataUsers } = useAppContext();
  const [userId, setUserId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
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
  }, [userId]);

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

  const handleLogout = () => {
    // Удаление всех cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    localStorage.setItem("category", "");
    localStorage.setItem("type", "");
    localStorage.setItem("cart", "");
    localStorage.setItem("wishlist", "");


    // Перенаправление на страницу входа
    location.href = "/sign_in";
  };

  return (
    <>
      {Array.isArray(dataUsers) && userId ? (
        dataUsers.map((el: any) => {
          if (userId === el._id) {
            return (
              <div key={el._id} className="relative" ref={modalRef}>
                <div
                  onClick={toggleModal}
                  className="xs:w-[25px] xs:h-[25px] xs:mt-[5px] lg:w-[35px] lg:h-[35px] object-cover rounded-[50%] overflow-hidden"
                >
                  <Image
                    className="object-cover w-full h-full"
                    src={el.image ? el.image[0] : "/images/person.svg"}
                    alt="User avatar"
                    width={100}
                    height={100}
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
                            className="group-hover:hidden"
                          />
                          <Image
                            src="/images/user_gray.svg"
                            alt="Manage Account Hover"
                            width={25}
                            height={20}
                            className="hidden group-hover:block"
                          />
                          {translation.main.account.modal.manage_acount}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/myorder"
                          className="group flex items-center text-[17px] gap-3 hover:text-gray-300 transition"
                        >
                          <Image
                            src="/images/orders_white.svg"
                            alt="Manage Account"
                            width={25}
                            height={20}
                            className="group-hover:hidden"
                          />
                          <Image
                            src="/images/orders_gray.svg"
                            alt="Manage Account Hover"
                            width={25}
                            height={20}
                            className="hidden group-hover:block"
                          />
                          {translation.main.account.modal.my_order}
                        </Link>
                      </li>

                      <li className="group flex items-center text-[17px] gap-3 hover:text-gray-300 transition">
                        <button className="flex gap-3" onClick={handleLogout}>
                          <Image
                            src="/images/exit_white.svg"
                            alt="Logout"
                            width={25}
                            height={20}
                            className="group-hover:hidden"
                          />
                          <Image
                            src="/images/exit_gray.svg"
                            alt="Logout Hover"
                            width={25}
                            height={20}
                            className="hidden group-hover:block"
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
        ""
      )}
    </>
  );
};

export default MyAcountModalCom;
