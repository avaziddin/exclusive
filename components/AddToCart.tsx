"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { log } from "console";
import { useAppContext } from "@/context";

interface Props {
    id: string;  // Один id товара
    border: boolean
}

const AddToCart: React.FC<Props> = ({ id, border }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [like, setLike] = useState<boolean>(false);  // Состояние для текущего id
    const [cart, setCart] = useState<{ [key: string]: any }>({}); // Состояние для хранения wishlist
    const { setCartCount } = useAppContext()

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
        const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "{}");
        setCart(cartFromLocalStorage);
        setLike(cartFromLocalStorage.hasOwnProperty(id));  // Проверяем, есть ли текущий товар в wishlist
    }, [id]);

    // Запрос GET для получения актуального списка wishlist с сервера
    useEffect(() => {
        if (userId) {
            const fetchWishlist = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/api/users/${userId}`);
                    if (res.ok) {
                        const data = await res.json();
                        setCart(data.data.cart);  // Загружаем wishlist с сервера
                        setCartCount(data.data.cart.length)
                        setLike(data.data.cart.includes(id));  // Проверяем, есть ли товар в wishlist с сервера
                    } else {
                        console.error("Failed to fetch wishlist");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("An error occurred while fetching wishlist");
                }
            };

            fetchWishlist();
        }
    }, [userId, id]);

    // Обрабатываем добавление или удаление товара из wishlist
    const toggleCart = async () => {
        if (!userId) {
            alert("User not found");
            return;
        }

        // Загружаем wishlist из localStorage
        const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "{}");

        let updatedCart = { ...cartFromLocalStorage };
        let itemExists = updatedCart.hasOwnProperty(id);

        // Если товар уже в wishlist, удаляем его
        if (itemExists) {
            delete updatedCart[id];  // Удаляем товар по ключу id
            setLike(false);
        } else {
            // Если товара нет в wishlist, добавляем его
            updatedCart[id] = {};  // Добавляем товар с пустым объектом в качестве значения
            setLike(true);
        }

        // Обновляем wishlist в localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Обновляем wishlist на сервере
        try {
            const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({ cart: Object.keys(updatedCart) }), // Отправляем только ключи (id товаров)
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                console.log(
                    itemExists ? "Item removed from wishlist" : "Item added to wishlist"
                );

                setCartCount(Object.keys(updatedCart).length);

            } else {
                const errorMessage = await res.text();
                alert(`Failed to update wishlist: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while updating the wishlist");
        }
    };

    console.log(cart);


    return (
        <div
            onClick={toggleCart}
            className={`w-full cursor-pointer flex justify-center items-center py-[10px] rounded-b-lg ${like ? "bg-red-500" : "bg-black"
                } text-white absolute bottom-0 ${border ? "opacity-100" : "opacity-0 group-hover:opacity-100"}  transition`}>
            <span>{like ? "Удалить из корзины" : "Добавить в корзину"}</span>
        </div>
    );
};

export default AddToCart;