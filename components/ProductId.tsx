"use client"

import { useAppContext } from '@/context';
import React, { ReactNode } from 'react';

interface ProductIdProps {
    id: string;
    lang: any;
    translation: any
}

const ProductId: React.FC<ProductIdProps> = ({ id, lang, translation }) => {
    const { dataProd } = useAppContext()


    return (
        <>
            {Array.isArray(dataProd) && dataProd.map((item: any) => (
                item._id === id ? (
                    <h1 className='text-black text-[50px]' key={item._id}>{item.titles[lang]}</h1>
                ) : null
            ))}

        </>
    );
};

export default ProductId;