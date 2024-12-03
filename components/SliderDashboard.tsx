import Image from 'next/image';
import React, { ReactNode } from 'react';
import DashboardProductModal from './Dashboard_product_modal';

interface SliderDashboardProps {
    item: any;
}

const SliderDashboard: React.FC<SliderDashboardProps> = ({ item }) => {
    return (
        <>
            <div className="relative mb-[1%] w-[49%] flex overflow-hidden bg-gray-200 gap-[10px] text-black rounded-md">
                <div className="w-full flex relative">

                    <Image className='h-[40vh] cover' src={item.image} alt={item.alt} width={500} height={500} />

                    <div className="right-[1%] top-[3%] absolute">
                        <DashboardProductModal type={"slider"} id={item._id} />
                    </div>

                    <div key={item._id} className="flex mt-[7%] gap-[30px] p-[1%]">
                        <p className='whitespace-nowrap text-[18px]'><span className='font-bold'>Title:</span> {item.alt}</p>
                    </div>

                </div>        </div>

        </>
    );
};

export default SliderDashboard;