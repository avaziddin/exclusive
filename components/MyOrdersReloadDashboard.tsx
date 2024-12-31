"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface MyOrderReloadProps {
    lang: any;
}

const MyOrderReload: React.FC<MyOrderReloadProps> = ({ lang }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const { dataUsers, dataProd } = useAppContext();

    useEffect(() => {
        const cookieStore = document.cookie;
        const userIdCookie = cookieStore
            .split("; ")
            .find((row) => row.startsWith("userId="))
            ?.split("=")[1];

        setUserId(userIdCookie || null);
    }, []);

    const handleStatusChange = async (userId: string, orderIndex: number, productIndex: number, newStatus: string) => {
        try {
            // Найти пользователя
            const user = dataUsers.find((user: any) => user._id === userId);

            if (!user) throw new Error("User not found");

            // Обновить статус конкретного товара в локальных данных
            const updatedOrders = [...user.orders];
            updatedOrders[orderIndex].ordersProduct[productIndex].type = newStatus;

            // Отправить PATCH-запрос на сервер
            const response = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orders: updatedOrders }),
            });

            if (!response.ok) throw new Error("Failed to update product status");

            alert("Product status updated successfully!");
        } catch (error) {
            console.error("Error updating product status:", error);
            alert("Failed to update product status");
        }
    };

    return (
        <div>
            {dataUsers.map((user: any, userIndex: number) => (
                <div key={userIndex} className="mb-10">
                    <h2 className="text-2xl font-bold text-black mb-5">
                        User: {user.name || user.email || `User ${userIndex + 1}`}
                    </h2>

                    {user.orders.length > 0 ? (
                        user.orders.map((order: any, orderIndex: number) => (
                            <div key={orderIndex} className="order mb-5">
                                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                                    Order {orderIndex + 1}
                                </h3>

                                <table className="w-full border-collapse border border-gray-300 text-left text-black text-[17px]">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-3 border border-gray-300">Product Image</th>
                                            <th className="p-3 border border-gray-300">Product Name</th>
                                            <th className="p-3 border border-gray-300">Order Date</th>
                                            <th className="p-3 border border-gray-300">Product Quantity</th>
                                            <th className="p-3 border border-gray-300">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.ordersProduct.map((product: any, productIndex: number) => {
                                            const matchedProduct = dataProd.find(
                                                (element: any) => element._id === product._id
                                            );

                                            return matchedProduct ? (
                                                <tr key={productIndex} className="hover:bg-gray-50">
                                                    <td className="p-3 border border-gray-300 w-[15%]">
                                                        <div className="rounded-lg w-full h-[15vh] overflow-hidden">
                                                            <Image
                                                                src={matchedProduct.image[0]}
                                                                alt={matchedProduct.titles.en}
                                                                width={500}
                                                                height={500}
                                                                className="w-full h-auto"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="p-3 border border-gray-300">
                                                        {matchedProduct.titles[lang]}
                                                    </td>
                                                    <td className="p-3 border border-gray-300">
                                                        {new Date(product?.orderDate).toLocaleTimeString()}{" "}
                                                        {new Date(product?.orderDate).getFullYear()}
                                                    </td>
                                                    <td className="p-3 border border-gray-300">
                                                        {product.quantity}
                                                    </td>
                                                    <td className="p-3 border border-gray-300">
                                                        {/* Select для изменения статуса */}
                                                        <select
                                                            value={product.type || "pending"}
                                                            onChange={(e) =>
                                                                handleStatusChange(
                                                                    user._id,
                                                                    orderIndex,
                                                                    productIndex,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="border border-gray-300 rounded p-2"
                                                        >
                                                            <option value="pending">pending</option>
                                                            <option value="ready">Ready</option>
                                                            <option value="delivering">Delivering</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ) : null;
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No orders found for this user.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MyOrderReload;
