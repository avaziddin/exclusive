import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface NewArialProps {
    translation: any
}

const NewArial: React.FC<NewArialProps> = ({ translation }) => {
    return (
        <>
            <div className="mb-[50px]">
                <div className="flex gap-[10px] mb-[20px] items-center ">
                    <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
                    <h1 className="text-[17px] font-semibold text-red-500">{translation.main.featured}</h1>
                </div>
                <span className="text-[36px] mb-[30px] font-semibold text-black">{translation.main.flash_sales}</span>

                <div className="w-full gap-[2%] mt-[50px] flex h-hit">
                    <div className="relative w-[44%] pt-[3%] rounded-lg text-white"
                        style={{ background: "rgba(13, 13, 13, 1)" }}
                    >
                        <div className="">
                        <Image className='m-auto absolute left-[10%] bottom-0 opacity-[.9]' src="/images/psFive.svg" alt="psFive" width={600} height={300} />
                        </div>
                        <div className="absolute bottom-[5%] left-[5%]">
                            <h1 className='text-[28px] font-semibold mb-[10px]'>{translation.main.playStation}</h1>
                            <p className='mb-[10px]'>{translation.main.BlackandWhite}</p>
                            <Link href="/">
                                <p className='border-b w-fit' >{translation.main.shop_now}</p>
                            </Link>
                        </div>
                    </div>

                    <div className="w-[54%] flex flex-col gap-[3.9%]">
                        <div className="flex relative justify-end mb-[3%] h-fit text-white rounded-lg"
                            style={{ background: "rgba(13, 13, 13, 1)" }}
                        >
                            <div className="absolute bottom-[10%] left-[4%] z-10">
                                <h1 className='text-[28px] whitespace-nowrap font-semibold mb-[10px]'>{translation.main.womens}</h1>
                                <p className='mb-[10px]'>{translation.main.womens_p}</p>
                                <Link href="/">
                                    <p className='text-[16px] border-b w-fit' >{translation.main.shop_now}</p>
                                </Link>
                            </div>
                            <div className="w-fit">
                            <Image className='opacity-[.9] rounded-lg' src="/images/women.svg" alt="women" width={450} height={300} />
                            </div>
                        </div>

                        <div className="relative overflow-hidden flex gap-[4%]">

                                <div
                                    className="w-[48%] rounded-lg relative flex justify-center pt-[1%]"
                                    style={{ background: "rgba(0, 0, 0, 1)" }}>

                                    <div className="w-[70%] m-auto pt-[6.3%] pl-[5%] pb-[5%]">
                                        <Image className='cover opacity-[.9]' src="/images/speackers.svg" alt="speckers" width={250} height={300} />
                                    </div>

                                    <div className="absolute bottom-[10%] left-[9%]">
                                        <h1 className='text-[28px] whitespace-nowrap font-semibold mb-[10px]'>{translation.main.speakers}</h1>
                                        <p className='mb-[10px]'>{translation.main.speakers_p}</p>
                                        <Link href="/">
                                            <p className='text-[16px] border-b w-fit' >{translation.main.shop_now}</p>
                                        </Link>
                                    </div>
                                </div>

                                <div
                                    className="w-[48%] rounded-lg relative flex justify-center pt-[1%]"
                                    style={{ background: "rgba(0, 0, 0, 1)" }}>
                                    <div className="w-[70%] m-auto pl-[5%]">
                                        <Image className='cover opacity-[.9]' src="/images/gucci.svg" alt="speckers" width={250} height={300} />
                                    </div>

                                    <div className="absolute bottom-[10%] left-[9%]">
                                        <h1 className='text-[28px] whitespace-nowrap font-semibold mb-[10px]'>{translation.main.gucci}</h1>
                                        <p className='mb-[10px]'>{translation.main.gucci_p}</p>
                                        <Link href="/">
                                            <p className='text-[16px] border-b w-fit' >{translation.main.shop_now}</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default NewArial;