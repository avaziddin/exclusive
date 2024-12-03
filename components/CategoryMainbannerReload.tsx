import Link from 'next/link';
import React, { ReactNode } from 'react';

interface CategoryMainbennerReloadProps {
    lang: any
}

const CategoryMainbennerReload: React.FC<CategoryMainbennerReloadProps> = async ({ lang }) => {
    const res = await fetch("http://localhost:3000/api/category", { cache: "no-cache" });
    const { data } = await res.json();



    return (
        <>
            {data.map((item : any) => {
              return  <Link key={item._id} className='py-[5px] text-[18px] px-[5px] rounded-b-none rounded-[5px] active:bg-gray-100 transition-[.2s]' href={"/"}>{item.titles[lang]}</Link>

            })}


        </>
    );
};

export default CategoryMainbennerReload;