import React from 'react';
import Modal_dashboard from '@/components/modal_dashboard';
import { getDictionary } from '@/app/[lang]/dictionaries';
import Products_Dashboard from '@/components/Product_Dashboard';
import { Product } from '@/models/product';

interface PageProps {
  params: { lang: string };
}

export default async function Page({ params: { lang } }: PageProps) {
  const translation = await getDictionary(lang);

  const res = await fetch("http://localhost:3000/api/product", { cache: "no-cache" })

  const { data } = await res.json()
  return (
    <>
      <div className="w-full bg-background">


          <Modal_dashboard button={
            <button className='p-[10px] pr-[15px] pl-[15px] font-medium text-[18px] absolute top-[1%] right-[1%] active:scale-[.9] transition-[.2s] active:bg-gray-300 text-black  bg-gray-200 rounded-[15px]'>
            Add product
         </button>
          } />
        
        <div className=" pt-[5%] p-[1%]">
          {data.map((item: Product) => {
            return <Products_Dashboard item={item} />
          })}
        </div>

      </div>
    </>
  );
};
