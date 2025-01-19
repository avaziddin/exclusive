import React, { cache } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import ModalSlider from '@/components/ModalSlider';
import Image from 'next/image';
import SliderDashboard from '@/components/SliderDashboard';

interface PageProps {
    params: { lang: string };
}

export default async function Page({ params: { lang } }: PageProps) {
    const translation = await getDictionary(lang);

    const res = await fetch('http://localhost:3000/api/slider', { cache: 'no-cache' })
    const { data } = await res.json()



    return (
        <>
            <div className="w-full bg-blue-950 pl-[1%] bg-background">


                <ModalSlider button={
                    <button className='p-[10px] pr-[15px] pl-[15px] font-medium text-[18px] absolute top-[1%] right-[1%] active:scale-[.9] transition-[.2s] active:bg-blue-950 text-white  bg-blue-800 rounded-[15px]'>
                        Add Sider
                    </button>
                } />

                <div className="z-[1] flex flex-wrap gap-[1%] pt-[5%] pr-[1%]">
                    {data.map((item: any) => {
                      return  <SliderDashboard item={item}/>
                    })}
                </div>

            </div>
        </>
    );
};
