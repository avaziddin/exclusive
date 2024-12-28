"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface WishLIstHeaderButtonProps {}

const WishLIstHeaderButton: React.FC<WishLIstHeaderButtonProps> = () => {
  const { dataUsers, dataProd } = useAppContext();
  const [userId, setUserId] = useState<string | null>(null);

  // Получаем userId из cookie
  useEffect(() => {
    const cookieStore = document.cookie;
    const userIdCookie = cookieStore
      .split("; ")
      .find((row) => row.startsWith("userId="))
      ?.split("=")[1];

    setUserId(userIdCookie || null);
  }, []);

  // Находим пользователя по userId
  const user = dataUsers.find((el: any) => el._id === userId);

  // Проверяем корректность данных
  const safeDataWishlist = user && Array.isArray(user?.wishlist) ? user?.wishlist : [];
  const safeDataProd = Array.isArray(dataProd) ? dataProd : [];

  // Фильтруем товары из dataProd, если их id присутствуют в wishlist
  const filteredProducts = safeDataProd.filter((product: any) => {
    return safeDataWishlist.some((wishlistItem: any) => {
      return String(wishlistItem) === String(product._id); // Приведение к строке для надёжного сравнения
    });
  });

  return (
    <>
      <Link className="relative" href={"/wishlist"}>
        {safeDataWishlist.length > 0 ? (
          <div className="text-white font-semibold text-[10px] px-[4px] rounded-[50%] bg-red-500 absolute top-0 right-0">{safeDataWishlist.length}</div>
        ) : (
          ""
        )}
        <Image src="/images/favourite.svg" alt="favourite" width={35} height={30} />
      </Link>
    </>
  );
};

export default WishLIstHeaderButton;
