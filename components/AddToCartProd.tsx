"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context";

interface Props {
    id: string;  // Один id товара
    border: boolean;
    translation: any;
}

const AddToCartProd: React.FC<Props> = ({ id, border, translation }) => {
    const [like, setLike] = useState<boolean>(false);  // Состояние для текущего id
    const [cart, setCart] = useState<{ [key: string]: any }>({}); // Состояние для хранения wishlist
    const { setCartCount, userId } = useAppContext()

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
                        console.log("Failed to fetch cart");
                    }
                } catch (error) {
                    console.log("Error:", error);
                    console.log("An error occurred while fetching cart");
                }
            };

            fetchWishlist();
        }
    }, [userId, id]);

    // Обрабатываем добавление или удаление товара из wishlist
    const toggleCart = async () => {
        if (!userId) {
            window.location.href = "/sign_in";
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
                console.log(`Failed to update wishlist: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error:", error);
            console.log("An error occurred while updating the wishlist");
        }
    };

    return (
        <button onClick={toggleCart} className={`${like ? "bg-red-500 text-white" : "bg-black text-white"
            } text-white w-[47.5%] rounded-md px-[5%]`}>{like ?  translation.main.del_from_cart : translation.main.add_to_cart }</button>
    );
};

export default AddToCartProd;