import Image from 'next/image';
import React, { ReactNode } from 'react';

interface AdvantagesProps {
    translation: any;
}

const Advantages: React.FC<AdvantagesProps> = ({ translation }) => {
    return (
        <>
            <div className="text-black text-center flex justify-center gap-[10%] mb-[100px] items-center">
                <div className="w-fit">
                    <div className="w-fit border-collapse mb-[30px] m-auto border-[15px] border-gray-300 p-[15px] flex justify-center items-center bg-black rounded-[50%]">
                        <Image src="/images/lorry.svg" alt="lorry" width={70} height={70} />
                    </div>
                    <h1 className='font-semibold mb-[5px] text-[20px] text-black text-center'>{translation.main.delivery.main}</h1>
                    <p className=''>{translation.main.delivery.p}</p>
                </div>

                <div className="w-fit">
                    <div className="w-fit border-collapse mb-[30px] m-auto border-[15px] border-gray-300 p-[15px] flex justify-center items-center bg-black rounded-[50%]">
                        <Image src="/images/headphones.svg" alt="lorry" width={70} height={70} />
                    </div>
                    <h1 className='font-semibold mb-[5px] text-[20px] text-black text-center'>{translation.main.headphones.main}</h1>
                    <p className=''>{translation.main.headphones.p}</p>
                </div>

                <div className="w-fit">
                    <div className="w-fit border-collapse mb-[30px] m-auto border-[15px] border-gray-300 p-[15px] flex justify-center items-center bg-black rounded-[50%]">
                        <Image src="/images/security.svg" alt="lorry" width={70} height={70} />
                    </div>
                    <h1 className='font-semibold mb-[5px] text-[20px] text-black text-center'>{translation.main.security.main}</h1>
                    <p className=''>{translation.main.security.p}</p>
                </div>


            </div>
        </>
    );
};

export default Advantages;