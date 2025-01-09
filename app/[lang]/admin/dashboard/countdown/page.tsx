"use client";

import React from 'react';
import { useAppContext } from '@/context';
import DashboardProductModal from '@/components/Dashboard_product_modal';

export default function Page() {
  const { count, loading } = useAppContext();

  // Получаем сегодняшнюю дату в формате ISO
  const today = new Date().toISOString().split('T')[0]; // Только дата без времени

  return (
    <>
      <div className="w-full pt-[2%] pl-[2%] bg-background">

        <div className="w-fit flex gap-[50px] bg-gray-100 p-[1%] rounded-lg justify-center items-center">
          {loading ? (
            <div className="flex justify-center gap-[5px] pt-[20px]">
              <span className='sr-only'>Loading...</span>
              <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div className='h-4 w-4 bg-black rounded-full animate-bounce'></div>
            </div>
          ) : (
            (count.length > 0 ? count : [{ _id: 'default', countdown: today }]).map((item: any) => (
              <div key={item._id} className='flex items-center gap-[50px]'>
                <div className="flex gap-[5px]">
                  <span className='text-[30px] text-black'>Date:</span>
                  <h1 className='text-[30px] whitespace-normal font-semibold text-black'>{item.countdown || "No timer"}</h1>
                </div>

                <div className="flex-col top-[2%] justify-end relative">
                  <DashboardProductModal type={"countdown"} id={item._id} />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}
