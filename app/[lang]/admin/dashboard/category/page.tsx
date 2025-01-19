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
      <div className="w-full bg-blue-950 pl-[1%] bg-background">


          <ModalCategory button={
            <button className='p-[10px] pr-[15px] pl-[15px] font-medium text-[18px] absolute top-[1%] right-[1%] active:scale-[.9] transition-[.2s] active:bg-blue-950 text-white  bg-blue-800 rounded-[15px]'>
              Add Category
            </button>
          } />

        <div className="z-[1] bg-blue-950 flex flex-wrap gap-[1%] pt-[7%] pr-[1%]">
          {data.map((item: Category) => {
            return <Category_Dashboard item={item} />
          })}
        </div>

      </div>
    </>
  );
};
