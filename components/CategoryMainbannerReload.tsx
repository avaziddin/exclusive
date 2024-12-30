"use client"

import { useAppContext } from '@/context';
import Link from 'next/link';

interface CategoryMainbennerReloadProps {
    lang: any
}

const CategoryMainbennerReload: React.FC<CategoryMainbennerReloadProps> = ({ lang }) => {
    const {dataCat} = useAppContext()


    const handleCategoryClick = (category: string) => {
        localStorage.setItem("category", category);
        localStorage.setItem("type", "");
    };



    return (
        <>
            {dataCat.map((item : any) => {
              return  <Link onClick={() => handleCategoryClick(item.titles.en)} key={item._id} className='py-[5px] text-[20px] px-[5px] rounded-b-none rounded-[5px] active:bg-gray-100 transition-[.2s]' href={"/allProd"}>{item.titles[lang]}</Link>

            })}


        </>
    );
};

export default CategoryMainbennerReload;