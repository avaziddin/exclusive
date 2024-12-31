"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { log } from "console";
import { useAppContext } from "@/context";

interface Props {
  id: string;  // Один id товара
  border: boolean;
}

const AddToWishlist: React.FC<Props> = ({ id, border }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [like, setLike] = useState<boolean>(false);  // Состояние для текущего id
  const [wishlist, setWishlist] = useState<{ [key: string]: any }>({}); // Состояние для хранения wishlist
  const { setWishlistCount } = useAppContext()

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
    setLike(wishlistFromLocalStorage.hasOwnProperty(id));  // Проверяем, есть ли текущий товар в wishlist
  }, [id]);

  // Запрос GET для получения актуального списка wishlist с сервера
  useEffect(() => {
    if (userId) {
      const fetchWishlist = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/users/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setWishlist(data.data.wishlist);  // Загружаем wishlist с сервера
            setWishlistCount(data.data.wishlist.length)
            setLike(data.data.wishlist.includes(id));  // Проверяем, есть ли товар в wishlist с сервера
          } else {
            console.log("Failed to fetch wishlist");
          }
        } catch (error) {
          console.log("Error:", error);
        }
      };

      fetchWishlist();
    }
  }, [userId, id]);

  // Обрабатываем добавление или удаление товара из wishlist
  const toggleWishlist = async () => {
    if (!userId) {
      window.location.href = "/sign_in";
      return;
    }

    // Загружаем wishlist из localStorage
    const wishlistFromLocalStorage = JSON.parse(localStorage.getItem("wishlist") || "{}");

    let updatedWishlist = { ...wishlistFromLocalStorage };
    let itemExists = updatedWishlist.hasOwnProperty(id);

    // Если товар уже в wishlist, удаляем его
    if (itemExists) {
      delete updatedWishlist[id];  // Удаляем товар по ключу id
      setLike(false);
    } else {
      // Если товара нет в wishlist, добавляем его
      updatedWishlist[id] = {};  // Добавляем товар с пустым объектом в качестве значения
      setLike(true);
    }

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
          itemExists ? "Item removed from wishlist" : "Item added to wishlist"
        );

        setWishlistCount(Object.keys(updatedWishlist).length);

      } else {
        const errorMessage = await res.text();
        console.log(`Failed to update wishlist: ${errorMessage}`);
      }
    } catch (error) {
      console.log("Error:", error);
      console.log("An error occurred while updating the wishlist");
    }
  };

  return (
    <div
      onClick={toggleWishlist}
      className={` ${border ? " border bg-white border-gray-400 rounded-md xs:w-[20%] sm:w-[10%] flex justify-center" : "xs:w-[25px] xs:p-[2px] xs:h-[25px] border-none lg:w-[35px] lg:h-[35px] flex items-center justify-center bg-white rounded-[50%]"} `}
    >
      <Image
        className=" active:scale-[.9] pl-[1px] transition-[.2]"
        src={`/images${like ? "/red_like.svg" : "/like.svg"}`}
        alt="Toggle wishlist"
        width={like ? 40 : 28}
        height={30}
      />
    </div>
  );
};

export default AddToWishlist;