"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  id: string; // Предполагается, что id это строка
}

const DeleteWishlist: React.FC<Props> = ({ id }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<{ [key: string]: string }>({}); // Изменено на объект

  // Получаем userId из cookie
  useEffect(() => {
    const cookieStore = document.cookie;
    const userIdCookie = cookieStore
      .split("; ")
      .find((row) => row.startsWith("userId="))
      ?.split("=")[1];

    setUserId(userIdCookie || null);
  }, []);

  // Загружаем wishlist из localStorage при монтировании
  useEffect(() => {
    const wishlistFromLocalStorage = JSON.parse(localStorage.getItem("wishlist") || "{}");
    setWishlist(wishlistFromLocalStorage);
  }, []);

  // Обработчик добавления или удаления товара из wishlist
  const toggleWishlist = async () => {
    if (!userId) {
      alert("User not found");
      return;
    }

    const updatedWishlist = { ...wishlist };

    if (updatedWishlist.hasOwnProperty(id)) {
      // Если товар уже в wishlist, удаляем его
      delete updatedWishlist[id];
    } else {
      // Если товара нет в wishlist, добавляем его
      updatedWishlist[id] = id; // Добавляем товар с ключом id
    }

    setWishlist(updatedWishlist);

    // Обновляем wishlist в localStorage
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Обновляем wishlist на сервере
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ wishlist: Object.keys(updatedWishlist) }), // Отправляем только ключи (id товаров)
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log(
          updatedWishlist.hasOwnProperty(id) ? "Item added to wishlist" : "Item removed from wishlist"
        );
        window.location.reload();
      } else {
        const errorMessage = await res.text();
        alert(`Failed to update wishlist: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the wishlist");
    }
  };

  return (
    <div
      onClick={() => toggleWishlist()}
      className="absolute cursor-pointer active:scale-[.9] transition-[.2] hover:bg-gray-100 top-[5%] p-[10px] pt-[8px] flex items-center justify-center rounded-full right-[3%] bg-white"
    >
      <Image src="/images/delete.svg" alt="delete" width={20} height={25} />
    </div>
  );
};

export default DeleteWishlist;
