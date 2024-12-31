"use client"

import { useAppContext } from '@/context';
import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

interface CheckoutFormProps {
    translation: any
    lang: any
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ translation, lang }) => {

    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cartData, setCartData] = useState<any[]>([]);
    const { dataProd, setCartCount, setWishlistCount } = useAppContext();

    useEffect(() => {
        const cookieStore = document.cookie;
        const userIdCookie = cookieStore
            .split("; ")
            .find((row) => row.startsWith("userId="))
            ?.split("=")[1];

        setUserId(userIdCookie || null);
    }, []);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (userId) {
                try {
                    const res = await fetch(`http://localhost:3000/api/users/${userId}`);
                    if (res.ok) {
                        const data = await res.json();
                        setCartCount(data.data.cart.length);
                        setWishlistCount(data.data.wishlist.length);
                    } else {
                        console.error("Failed to fetch wishlist");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("An error occurred while fetching wishlist");
                }
            }
        };

        fetchWishlist();
    }, [userId, setCartCount]);

    useEffect(() => {
        // Симуляция загрузки данных (если данные берутся асинхронно)
        const storedCartData = JSON.parse(localStorage.getItem("cartData") || "[]");
        setCartData(storedCartData);
        setIsLoading(false); // Завершаем загрузку после получения данных
    }, []);

    // Если корзина пуста
    if (cartData.length === 0) {
        return <div className="text-center">Your cart is empty</div>;
    }

    // Вычисление subtotal
    const subtotal = cartData.reduce((acc: number, item: any) => {
        return acc + item.price * item.quantity;
    }, 0);

    const total = subtotal;

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const fm = new FormData(e.currentTarget);
        const product: Record<string, string> = {};

        fm.forEach((val, key) => (product[key] = val.toString()));

        // Добавляем дату к каждому продукту в корзине
        const updatedCartData = cartData.map((item) => ({
            ...item,
            orderDate: new Date().toISOString(),  // Добавляем текущую дату в формате ISO
        }));

        // Формируем объект с массивами ordersInfo и ordersProduct
        const orderDetails = {
            ordersInfo: [{ ...product, ordersProduct: updatedCartData }],  // ordersInfo теперь включает ordersProduct с датой
        };

        try {
            // Получаем текущие заказы пользователя
            const res = await fetch(`/api/users/${userId}`);
            if (!res.ok) {
                throw new Error("Failed to fetch current orders");
            }

            const userData = await res.json();
            const existingOrders = userData.data.orders || [];  // Получаем текущие заказы, если они есть

            // Добавляем новый заказ к существующим
            const updatedOrders = [...existingOrders, ...orderDetails.ordersInfo];

            // Отправляем обновленный список заказов на сервер
            const updateRes = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({ orders: updatedOrders }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (updateRes.ok) {
                // После успешного обновления заказов очищаем корзину
                const clearCartRes = await fetch(`/api/users/${userId}`, {
                    method: "PATCH",
                    body: JSON.stringify({ cart: [] }),  // Отправляем пустой массив для очистки корзины
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                localStorage.setItem("cart", "");
                localStorage.setItem("cartData", "");

                window.location.href = "/myorder";

                if (clearCartRes.ok) {
                    alert("Order updated and cart cleared successfully!");
                } else {
                    alert("Failed to clear cart after order update");
                }
            } else {
                alert("Failed to update orders");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while updating orders");
        }
    }


    // Основной рендер
    return (
        <form onSubmit={onSubmit} className="flex mt-[50px] w-full justify-between ">
            <div className="flex flex-col w-[40%] mb-[50px] gap-10 ">
                <div className="flex rounded-lg flex-col gap-2">
                    <label className="text-xl text-gray-300">{translation.main.checkout.first}</label>
                    <input type="text" name="name" className="w-full py-[1vh] text-[18px] rounded-lg bg-zinc-100 outline-none text-black pl-2" />
                </div>

                <div className="flex rounded-lg flex-col gap-2">
                    <label className="text-xl text-gray-300">{translation.main.checkout.company}</label>
                    <input type="text" name="company" className="w-full py-[1vh] text-[18px] rounded-lg bg-zinc-100 outline-none text-black pl-2" />
                </div>

                <div className="flex rounded-lg flex-col gap-2">
                    <span className="text-xl text-gray-300">{translation.main.checkout.street}</span>
                    <input type="text" name="street" className="w-full h-[50px] bg-zinc-100 outline-none text-black pl-2" />
                </div>

                <div className="flex rounded-lg flex-col gap-2">
                    <label className="text-xl text-gray-300">{translation.main.checkout.apartmen}</label>
                    <input type="text" name="house" className="w-full py-[1vh] text-[18px] rounded-lg bg-zinc-100 outline-none text-black pl-2" />
                </div>

                <div className="flex rounded-lg flex-col gap-2">
                    <label className="text-xl text-gray-300">{translation.main.checkout.town}</label>
                    <input type="text" name="town" className="w-full py-[1vh] text-[18px] rounded-lg bg-zinc-100 outline-none text-black pl-2" />
                </div>

                <div className="flex rounded-lg flex-col gap-2">
                    <label className="text-xl text-gray-300">{translation.main.checkout.phone}</label>
                    <input type="phone" name="phone" className="w-full py-[1vh] text-[18px] rounded-lg bg-zinc-100 outline-none text-black pl-2" />
                </div>

                <div className="flex rounded-lg flex-col gap-2">
                    <label className="text-xl text-gray-300">{translation.main.checkout.email}</label>
                    <input type="email" name="email" className="w-full h-[50px] rounded-lg bg-zinc-100 outline-none text-black pl-2" />
                </div>
            </div>

            <div className="flex flex-col text-black gap-10 mb-[10vh] w-[40%]">
                {isLoading ? (
                    <div className="flex justify-center items-center mt-10">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid rounded-full border-primary" role="status">
                            <span className="sr-only text-black">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Отображение товаров из корзины */}
                        {cartData.map((el: any) => {
                            const matchedItem = dataProd.find((item: any) => item._id === el._id);

                            if (matchedItem) {
                                return (
                                    <div key={matchedItem._id}>
                                        <div className="w-full mb-[30px] flex justify-between items-center">
                                            <div className="flex items-center gap-[20px]">
                                                <div className="flex rounded-lg overflow-hidden w-[30%] h-[10vh] gap-5 items-center">
                                                    <Image
                                                        className='w-full object-cover'
                                                        src={matchedItem.image[0] || "/images/televizor.svg"} // Динамическое изображение товара
                                                        alt={matchedItem.name || "Product"}
                                                        width={500}
                                                        height={500}
                                                    />
                                                </div>
                                                <span className='text-[20px]'>{matchedItem.titles[lang]}</span> {/* Динамическое название товара */}
                                            </div>
                                            <span className='whitespace-nowrap text-[20px]'>{matchedItem.discount > 0
                                                ? `$ ${(matchedItem.price - (matchedItem.price * matchedItem.discount) / 100).toFixed(2)}`
                                                : `$ ${matchedItem.price}`}</span> {/* Динамическая цена после скидки */}
                                        </div>
                                    </div>
                                );
                            }
                            return null; // Возвращаем null, если не нашли совпадений
                        })}

                        {/* Отображение суммы */}
                        <div className="flex w-full justify-between">
                            <span>Subtotal:</span>
                            <p>{`$${total.toFixed(2)}`}</p>
                        </div>
                        <hr className="w-full" />

                        <div className="flex w-full justify-between">
                            <span>Shipping:</span>
                            <span>"Free"</span>
                        </div>
                        <hr className="w-full" />

                        <div className="flex w-full justify-between">
                            <span>Total:</span>
                            <p>{`$${total.toFixed(2)}`}</p>
                        </div>
                    </>
                )}

                <div className="flex gap-5">
                    <Image src="/images/radio2.svg" alt="hello" width={25} height={25} />
                    <span>{translation.main.checkout.cash}</span>
                </div>

                <button type='submit' className="w-[40%] py-[1.5vh] bg-red-500 rounded-md text-white">
                    {translation.main.checkout.place}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
