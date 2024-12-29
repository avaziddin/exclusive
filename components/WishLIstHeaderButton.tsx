"use client";

import { useAppContext } from "@/context"; // Подключаем контекст
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WishLIstHeaderButton: React.FC = () => {
  const { wishlistCount } = useAppContext(); // Извлекаем wishlistCount из контекста

  console.log(wishlistCount);
  
  return (
    <Link className="relative" href={"/wishlist"}>
      {wishlistCount > 0 && (
        <div className="text-white font-semibold text-[10px] px-[4px] rounded-[50%] bg-red-500 absolute top-0 right-0">
          {wishlistCount}
        </div>
      )}
      <Image src="/images/favourite.svg" alt="favourite" width={35} height={30} />
    </Link>
  );
};

export default WishLIstHeaderButton;
