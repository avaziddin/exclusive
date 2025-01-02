"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AppContext = createContext<any>(null);

export function AppWrapper({ children }: { children: ReactNode }) {
    const [dataC, setDataC] = useState<any[]>([]);
    const [dataCat, setDataCat] = useState<any[]>([]);
    const [dataUsers, setDataUsers] = useState<any[]>([]);
    const [dataWishlist, setDataWishlist] = useState<any[]>([]);
    const [count, setCount] = useState<any[]>([]);
    const [wishlistCount, setWishlistCount] = useState<any[]>([]);
    const [cartCount, setCartCount] = useState<any[]>([]);
    const [dataProd, setDataProd] = useState<any[]>([]);
    const [category, setCategory] = useState<any>("Menu");
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Извлечение userId из cookies
        const cookieStore = document.cookie;
        const userIdCookie = cookieStore
            .split("; ")
            .find((row) => row.startsWith("userId="))
            ?.split("=")[1];
        setUserId(userIdCookie || null);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Выполнение запросов параллельно
                const [resCategory, resProd, resCount, resUsers] = await Promise.all([
                    fetch("http://localhost:3000/api/category", { cache: "no-cache" }),
                    fetch("http://localhost:3000/api/product", { cache: "no-cache" }),
                    fetch("http://localhost:3000/api/countdown", { cache: "no-cache" }),
                    fetch("http://localhost:3000/api/users", { cache: "no-cache" }),
                ]);

                // Преобразование данных
                const [categoryData, prodData, countData, usersData] = await Promise.all([
                    resCategory.json(),
                    resProd.json(),
                    resCount.json(),
                    resUsers.json(),
                ]);

                // Установка данных
                setDataCat(categoryData.data);
                setDataProd(prodData.data);
                setCount(countData.data);
                setDataUsers(usersData.data);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <AppContext.Provider
            value={{
                wishlistCount,
                cartCount,
                setCartCount,
                setCategory,
                category,
                setWishlistCount,
                dataWishlist,
                setDataWishlist,
                count,
                dataUsers,
                setDataUsers,
                setCount,
                dataProd,
                setDataProd,
                dataC,
                setDataC,
                dataCat,
                setDataCat,
                loading,
                setLoading,
                userId, // Добавляем userId в контекст
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
