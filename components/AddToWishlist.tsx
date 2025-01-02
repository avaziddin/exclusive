"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context";

interface Props {
  id: string; // Один id товара
  border: boolean;
}

const AddToWishlist: React.FC<Props> = ({ id, border }) => {
  const [like, setLike] = useState(false); // Состояние для текущего id
  const { setWishlistCount, userId } = useAppContext();

  // Инициализация wishlist из localStorage
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "{}");
    setLike(Boolean(wishlist[id])); // Проверяем наличие товара
  }, [id]);

  // Запрос актуального списка wishlist с сервера
  useEffect(() => {
    if (!userId) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}`);
        if (res.ok) {
          const { data } = await res.json();
          setWishlistCount(data.wishlist.length);
          setLike(data.wishlist.includes(id));
        }
      } catch {
        console.error("Не удалось загрузить wishlist");
      }
    };

    fetchWishlist();
  }, [userId, id]);

  // Тоггл товара в wishlist
  const toggleWishlist = async () => {
    if (!userId) {
      window.location.href = "/sign_in";
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "{}");
    const updatedWishlist = { ...wishlist };

    if (updatedWishlist[id]) {
      delete updatedWishlist[id];
      setLike(false);
    } else {
      updatedWishlist[id] = {};
      setLike(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlist: Object.keys(updatedWishlist) }),
      });

      if (res.ok) {
        setWishlistCount(Object.keys(updatedWishlist).length);
      }
    } catch {
      console.error("Ошибка при обновлении wishlist");
    }
  };

  return (
    <div
      onClick={toggleWishlist}
      className={`${
        border
          ? "border bg-white border-gray-400 rounded-md xs:w-[20%] sm:w-[10%] flex justify-center"
          : "xs:w-[25px] xs:p-[2px] xs:h-[25px] border-none lg:w-[35px] lg:h-[35px] flex items-center justify-center bg-white rounded-[50%]"
      }`}
    >
      <Image
        className="active:scale-[.9] pl-[1px] transition-[.2]"
        src={`/images${like ? "/red_like.svg" : "/like.svg"}`}
        alt="Toggle wishlist"
        width={like ? 40 : 28}
        height={30}
      />
    </div>
  );
};

export default AddToWishlist;
