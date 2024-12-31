"use client";

import { useAppContext } from '@/context';
import Link from 'next/link';
import React, { useState, useMemo, useEffect } from 'react';

interface SearchProps {
    translation: any;
    lang: any;
}

const Search: React.FC<SearchProps> = ({ translation, lang }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { dataProd, dataCat } = useAppContext();

    // Фильтрация товаров и категорий
    const filteredProducts = useMemo(() => {
        return dataProd.filter((product: any) =>
            product?.titles?.[lang]?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, dataProd, lang]);


    const filteredCategories = useMemo(() => {
        return dataCat.filter((category: any) =>
            category?.titles[lang]?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, dataCat, lang]);

    const handleCategoryClick = (category: any) => {
        // You can set your category in local storage inside the event handler
        localStorage.setItem("type", "");
        localStorage.setItem("category", category);
    };

    // Эффект для отключения скролла у body


    return (
        <div className="relative xs:ml-[5px] xs:w-[100px] sm:w-[50%] lg:w-fit  z-50">
            <input
                className="xs:text-[13px] sm:text-[13px] sx:px-[4px]  xs:px-[8px] sm:px-[10px]  sm:py-[.5vh]  flex xs:p-[2px] sm:w-full items-center  xl:w-full lg:px-[15px] lg:text-[17px] lg:py-[7px] rounded-[5px] outline-none bg-gray-200 text-black placeholder-gray-500 shadow-md focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                placeholder={translation.header.search}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Список результатов поиска */}
            {(filteredProducts.length > 0 || filteredCategories.length > 0) && (
                <div className="absolute xs:w-fit md:w-full mt-2 bg-white shadow-lg max-h-[300px] rounded-lg overflow-y-auto transition-all duration-300 transform" style={{ transform: searchQuery ? 'translateY(0)' : 'translateY(-20px)', opacity: searchQuery ? 1 : 0 }}>
                    <div>
                        {filteredProducts.length > 0 && (
                            <div>
                                <h4 className="p-2 text-xl font-semibold">{translation.header.products}</h4>
                                <ul>
                                    {filteredProducts.map((product: any) => (
                                        <Link key={product._id} href={`/${product._id}`}>
                                            <li className="p-2 text-black rounded-lg hover:bg-gray-100 cursor-pointer">
                                                {product.titles[lang]}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {filteredCategories.length > 0 && (
                            <div>
                                <h4 className="p-2 text-xl font-semibold">{translation.header.categories}</h4>
                                <ul>
                                    {filteredCategories.map((category: any) => (
                                        <Link key={category._id} href="/allProd" onClick={() => handleCategoryClick(category.titles.en)}>
                                            <li className="p-2 text-black hover:bg-gray-100 cursor-pointer">
                                                {category.titles[lang]}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
