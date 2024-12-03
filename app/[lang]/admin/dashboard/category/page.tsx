import React, { cache } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Category } from '@/models/category';
import Category_Dashboard from '@/components/Category_Dashboard';
import ModalCategory from '@/components/ModalCategory';

interface PageProps {
  params: { lang: string };
}

export default async function Page({ params: { lang } }: PageProps) {
  const translation = await getDictionary(lang);

  const res = await fetch('http://localhost:3000/api/category', { cache: 'no-cache' })
  const { data } = await res.json()

  console.log(data);


  return (
    <>
      <div className="w-full pl-[1%] bg-background">


          <ModalCategory button={
            <button className='p-[10px] pr-[15px] pl-[15px] font-medium text-[18px] absolute top-[1%] right-[1%] active:scale-[.9] transition-[.2s] active:bg-gray-300 text-black  bg-gray-200 rounded-[15px]'>
              Add Category
            </button>
          } />

        <div className="z-[1] flex flex-wrap gap-[1%] pt-[5%] pr-[1%]">
          {data.map((item: Category) => {
            return <Category_Dashboard item={item} />
          })}
        </div>

      </div>
    </>
  );
};
