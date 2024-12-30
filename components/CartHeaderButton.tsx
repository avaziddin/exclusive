"use client";

import { useAppContext } from "@/context"; // Подключаем контекст
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartHeaderButton: React.FC = () => {
  const { cartCount } = useAppContext();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const cookieStore = document.cookie;
    const userIdCookie = cookieStore
      .split("; ")
      .find((row) => row.startsWith("userId="))
      ?.split("=")[1];

    setUserId(userIdCookie || null);
  }, []); // Извлекаем wishlistCount из контекста

  console.log(cartCount);

  
  
  return (
    <Link className="relative" href={`${userId ? "/cart" : "/sign_in"}`}>
      {cartCount > 0 && (
        <div className="text-white font-semibold text-[10px] px-[4px] rounded-[50%] bg-red-500 absolute top-0 right-0">
          {cartCount}
        </div>
      )}
      <Image src="/images/cart.svg" alt="favourite" width={35} height={30} />
    </Link>
  );
};

export default CartHeaderButton;
