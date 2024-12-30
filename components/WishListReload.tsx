"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import { useEffect, useState } from "react";
import RealetedProduct from "./RealetedProducts";
import DeleteWishlist from "./DeleteWishlist";
import Link from "next/link";
import AddToCart from "./AddToCart";

interface WishlistReloadProps {
    translation: any;
    lang: any;
}

const WishlistReload: React.FC<WishlistReloadProps> = ({ translation, lang }) => {
    const { dataUsers, dataProd, loading, setWishlistCount } = useAppContext();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const cookieStore = document.cookie;
        const userIdCookie = cookieStore
            .split("; ")
            .find((row) => row.startsWith("userId="))
            ?.split("=")[1];

        setUserId(userIdCookie || null);
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchWishlist = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/api/users/${userId}`);
                    if (res.ok) {
                        const data = await res.json();
                        setWishlistCount(data.data.wishlist.length); // Обновление количества товаров в wishlist
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
    }, [userId, setWishlistCount]); // Не забываем добавлять setWishlistCount как зависимость

    const user = dataUsers.find((el: any) => el._id === userId);

    // Проверяем, что данные корректно определены
    const safeDataWishlist = user && Array.isArray(user?.wishlist) ? user?.wishlist : [];
    const safeDataProd = Array.isArray(dataProd) ? dataProd : [];

    // Фильтруем товары из dataProd, если их id присутствуют в wishlist
    const filteredProducts = safeDataProd.filter((product: any) => {
        return safeDataWishlist.some((wishlistItem: any) => {
            return String(wishlistItem) === String(product._id); // Приведение к строке для надёжного сравнения
        });
    });

    const noWishList = safeDataProd.filter((product: any) => {
        return !safeDataWishlist.some((wishlistItem: any) => {
            return String(wishlistItem) === String(product._id); // Приведение к строке для надёжного сравнения
        });
    });


    return (
        <>
            <div className="text-black flex justify-between mt-24">
                <span className="text-[25px] font-medium">
                    {translation.main.wishlist.title} ({safeDataWishlist.length})
                </span>
                <button className="w-[15%] p-[10px] border hover:border-white hover:bg-red-500 transition-[.2s] hover:text-white active:scale-[.9] border-black rounded-xl">
                    {translation.main.wishlist.move}
                </button>
            </div>

            <div className="flex gap-[2%] overflow-x-auto scrollbar-hidden mb-[50px] mt-[50px]">
                {loading ? (
                    <div className="flex justify-center items-center w-full h-[50vh]">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="w-[60px] h-[60px] text-gray-100 animate-spin dark:text-gray-300 fill-gray-200"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
                    </div>
                ) : safeDataWishlist.length === 0 ? (
                    <p className="text-center text-[30px] text-black mt-[25vh] mb-[25vh] font-semibold flex justify-center w-full items-center">
                        {translation?.main?.wishlist_empty || "Your wishlist is empty"}
                    </p>
                ) : (
                    filteredProducts.map((item: any) => (
                        <div key={item._id} className="whitespace-nowrap w-[18.4%] flex-shrink-0 h-fit mb-[50px]">
                            <div className="hover:bg-gray-100 group rounded-lg w-fit pb-[20px] transition-[.1s]">
                                <div className="mb-[10px] relative rounded-xl">
                                    <DeleteWishlist id={item._id} />
                                    {item.discound > 0 && (
                                        <div className="px-[10px] py-[3px] bg-red-500 rounded-lg absolute top-[2%] left-[2%]">
                                            <span>-{item.discound}%</span>
                                        </div>
                                    )}
                                    <Image
                                        className="w-content h-[33vh] rounded-lg object-cover"
                                        src={item.image[0]}
                                        alt="product"
                                        width={500}
                                        height={300}
                                    />
                                    
                                    <AddToCart border={true} id={item._id} />

                                </div>
                                <div>
                                    <h1 className="text-black font-semibold text-[18px] mb-[10px] px-[10px]">
                                        {item.titles[lang]}
                                    </h1>
                                    <div className="flex font-medium gap-[10px] px-[10px] mb-[10px]">
                                        <span className="text-[18px] text-red-500">
                                            $ {item.discound > 0
                                                ? (item.price - (item.price * item.discound) / 100).toFixed(2)
                                                : item.price}
                                        </span>
                                        {item.discound > 0 && (
                                            <span className="flex items-center text-gray-500 line-through">{item.price}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {noWishList.length > 0 &&

                <div className="flex justify-between">
                    <div className="flex gap-5 items-center">
                        <div className="bg-red-500 w-[20px] h-[40px] rounded-lg"></div>
                        <span className="text-black font-semibold text-2xl">{translation.main.wishlist.just}</span>
                    </div>
                    <button className="text-black w-[15%] p-[10px] border hover:bg-red-500 transition-[.2s] hover:border-white hover:text-white active:scale-[.9] border-black rounded-xl">
                        {translation.main.wishlist.see}
                    </button>
                </div>
            }


            <div className="flex gap-[2%] overflow-x-auto scrollbar-hidden mt-[50px]">
                {
                    noWishList.map((item: any) => (
                        <div key={item._id} className="whitespace-nowrap w-[18.4%] flex-shrink-0 h-fit mb-[50px]">
                            <div className="hover:bg-gray-100 group rounded-lg w-fit pb-[20px] transition-[.1s]">
                                <div className="mb-[10px] relative rounded-xl">

                                    {item.discound > 0 && (
                                        <div className="px-[10px] py-[3px] bg-red-500 rounded-lg absolute top-[2%] left-[2%]">
                                            <span>-{item.discound}%</span>
                                        </div>
                                    )}
                                    <Link href={`/${item._id}`}>
                                        <div className="absolute cursor-pointer top-[5%] p-[7px] pt-[8px] flex items-center justify-center rounded-full right-[3%] bg-white">
                                            <Image src="/images/eye.svg" alt="eye" width={20} height={20} />
                                        </div>
                                    </Link>

                                    <Link href={`/${item._id}`}>
                                        <Image
                                            className="w-conent h-[30vh] rounded-lg object-cover"
                                            src={item.image?.[0] || "/images/placeholder.png"}
                                            alt="product"
                                            width={500}
                                            height={300}
                                        />
                                    </Link>

                                    <AddToCart border={true} id={item._id} />

                                </div>
                                <div>
                                    <h1 className="text-black font-semibold text-[18px] mb-[10px] px-[10px]">
                                        {item.titles[lang]}
                                    </h1>
                                    <div className="flex font-medium gap-[10px] px-[10px] mb-[10px]">
                                        <span className="text-[18px] text-red-500">
                                            $ {item.discound > 0
                                                ? (item.price - (item.price * item.discound) / 100).toFixed(2)
                                                : item.price}
                                        </span>
                                        {item.discound > 0 && (
                                            <span className="flex items-center text-gray-500 line-through">{item.price}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default WishlistReload;
