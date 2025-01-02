"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface MyOrderReloadProps {
    lang: any;
    translation: any
}

const MyOrderReload: React.FC<MyOrderReloadProps> = ({ lang, translation }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const { dataUsers, dataProd, setWishlistCount, setCartCount } = useAppContext();

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

    const user = Array.isArray(dataUsers)
        ? dataUsers.find((el: any) => el._id === userId)
        : null;

    console.log(user);

    return (
        <div>
    {user?.orders.length > 0 ? (
        user.orders.map((order: any, orderIndex: number) => (
            <div key={orderIndex} className="order mt-[10vh]">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-black text-[12px] xs:text-[14px] sm:text-[16px] md:text-[17px] mb-[5vh]">
                        <thead>
                            <tr className="text-[14px] xs:text-[16px] sm:text-[18px] mb-[50px] font-medium">
                                <th className="p-2 xs:p-3 text-[14px] xs:text-[16px] font-thin">{translation.main.cart.image}</th>
                                <th className="p-2 xs:p-3 text-[14px] xs:text-[16px] font-thin">{translation.main.cart.yag}</th>
                                <th className="p-2 xs:p-3 text-[14px] xs:text-[16px] font-thin">{translation.main.cart.date}</th>
                                <th className="p-2 xs:p-3 text-[14px] xs:text-[16px] font-thin">{translation.main.cart.se}</th>
                                <th className="p-2 xs:p-3 text-[14px] xs:text-[16px] font-thin">{translation.main.cart.du}</th>
                                <th className="p-2 xs:p-3 text-[14px] xs:text-[16px] font-thin">Size</th>
                                <th className="p-2 xs:p-3 text-[14px] xs:text-[16px] font-thin">{translation.main.cart.color}</th>
                                <th className="p-2 xs:p-3 text-[14px] xs:text-[16px] font-thin">{translation.main.cart.status}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.ordersProduct.map((product: any, productIndex: number) => {
                                const matchedProduct = dataProd.find(
                                    (element: any) => element._id === product._id
                                );

                                return matchedProduct ? (
                                    <tr
                                        key={productIndex}
                                        className={`${product.type === "pending" && "bg-red-100"} 
                                                    ${product.type === "delivering" && "bg-yellow-100"} 
                                                    ${product.type === "ready" && "bg-green-100"} 
                                                    rounded-xl`}
                                    >
                                        <td className="p-2 xs:p-3 border-gray-300 w-[25%] xs:w-[30%] sm:w-[15%] md:w-[10%]">
                                            <div className="rounded-lg w-[80%] h-[8vh] xs:h-[12vh] sm:h-[15vh] overflow-hidden">
                                                <Image
                                                    src={matchedProduct.image[0]}
                                                    alt={matchedProduct.titles.en}
                                                    width={500}
                                                    height={500}
                                                    className="w-full object-cover h-auto"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-2 xs:p-3  border-gray-300">
                                            {matchedProduct.titles[lang]}
                                        </td>
                                        <td className="p-2 xs:p-3  border-gray-300">
                                            {new Date(product?.orderDate).toLocaleTimeString()}{" "}
                                            {new Date(product?.orderDate).getFullYear()}
                                        </td>
                                        <td className="p-2 xs:p-3 pl-[2%]">
                                            {product.quantity}
                                        </td>
                                        <td className="p-2 xs:p-3">
                                            $ {product.total}
                                        </td>
                                        <td className="p-2 xs:p-3">
                                            {product.size ? product.size[0].size : "Standard"}
                                        </td>
                                        <td className="p-2 xs:p-3">
                                            {product.colors ? product.colors[0].name[lang] : "Standard"}
                                        </td>
                                        <td className="p-2 xs:p-3">
                                            {product.type}
                                        </td>
                                    </tr>
                                ) : null;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        ))
    ) : (
        <p className="w-full flex justify-center text-[18px] xs:text-[20px] sm:text-[30px] font-semibold text-black mt-[25vh] mb-[25vh]">
            You have no orders right now.
        </p>
    )}
</div>


    );
};

export default MyOrderReload;
