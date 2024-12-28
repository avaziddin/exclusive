import Link from "@/node_modules/next/link";
import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";
import Image from "@/node_modules/next/image";

export default async function About({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)

    return (
        <Layout lang={undefined} translation={translation}>
            <div className="flex gap-2 text-xl mt-[50px]"> <Link href='/'><span className="text-gray-400">{translation.main.about.home}</span></Link><span className="text-black">/</span> <span className="text-black">{translation.main.about.about}</span></div>
            <div className="flex justify-between items-center text-black ">
                <div className="flex flex-col gap-10">
                    <h1 className="text-[60px] font-bold">{translation.main.about.ourstory}</h1>
                    <span className="text-[18px] w-[80%]">{translation.main.about.span1} </span>
                    <span className="text-[18px] w-[80%]">{translation.main.about.span2}</span>
                </div>
                <Image src="/images/duxtaro.svg" alt="duxtaro" width={720} height={10} />
            </div>

            <div className="flex justify-between text-[16px] mt-48 text-black">
                <div className=" w-[20%] rounded-md border-gray-300 border-[3px] flex flex-col py-5 gap-3  items-center">
                        <Image src="/images/firsticon.svg" alt="yakum" width={82} height={10} />
                    <span className="font-bold text-[32px]">10.5k</span>
                    <span>{translation.main.about.first}</span>
                </div>
                <div className=" w-[20%] text-white bg-red-500  rounded-md flex flex-col py-5 gap-3 items-center">
                    <Image src="/images/duyom.svg" alt="yakum" width={82} height={10} />
                    <span className="font-bold text-[32px]">33k</span>
                    <span>{translation.main.about.second}</span>
                </div>
                <div className=" w-[20%]  rounded-md border-gray-300 border-[3px] flex flex-col py-5 gap-3 items-center">
                    <Image src="/images/seyum.svg" alt="yakum" width={82} height={10} />
                    <span className="font-bold text-[32px]">45.5k</span>
                    <span>{translation.main.about.third}</span>
                </div>
                <div className=" w-[20%]  rounded-md border-gray-300 border-[3px] flex flex-col py-5 gap-3 items-center">
                    <Image src="/images/chorom.svg" alt="yakum" width={82} height={10} />
                    <span className="font-bold text-[32px]">25k</span>
                    <span>{translation.main.about.fourth}</span>
                </div>
            </div>

            <div className="flex justify-between mt-32">
                <div className="w-[30%] flex flex-col justify-between text-black">
                    <Image className="w-full" src="/images/tom.svg" alt="yag" width={370} height={1} />
                    <h1 className="text-[35px] font-bold mt-3">Tom Cruise</h1>
                    <span className="mb-[10px] text-[22px]">{translation.main.about.yag}</span>
                    <div className="flex gap-4">
                        <Image src="/images/Icon-Twitter (2).svg" alt="yag" width={30} height={1} />
                        <Image src="/images/icon-instagram.svg" alt="yag" width={30} height={1} />
                        <Image src="/images/in.svg" alt="yag" width={30} height={1} />
                    </div>
                </div>
                <div className="w-[30%] flex flex-col justify-between text-black">
                    <Image className="w-full" src="/images/emma.svg" alt="yag" width={370} height={1} />
                    <h1 className="text-[35px] font-bold mt-3">Emma Watson</h1>
                    <span className="mb-[10px] text-[22px]">{translation.main.about.du}</span>
                    <div className="flex gap-4">
                        <Image src="/images/Icon-Twitter (2).svg" alt="yag" width={30} height={1} />
                        <Image src="/images/icon-instagram.svg" alt="yag" width={30} height={1} />
                        <Image src="/images/in.svg" alt="yag" width={30} height={1} />
                    </div>
                </div>
                <div className="w-[30%] flex flex-col  justify-between text-black">
                    <Image className="w-full" src="/images/will.svg" alt="yag" width={370} height={1} />
                    <h1 className="text-[35px] font-bold mt-3">Will Smith</h1>
                    <span className="mb-[10px] text-[22px]">{translation.main.about.se}</span>
                    <div className="flex gap-4">
                        <Image src="/images/Icon-Twitter (2).svg" alt="yag" width={30} height={1} />
                        <Image src="/images/icon-instagram.svg" alt="yag" width={30} height={1} />
                        <Image src="/images/in.svg" alt="yag" width={30} height={1} />
                    </div>
                </div>
            </div>

            <div className="text-black text-center flex justify-center gap-[7%] mt-[100px] items-center">
                <div className="w-fit">
                    <div className="w-fit border-collapse mb-[30px] m-auto border-[15px] border-gray-300 p-[15px] flex justify-center items-center bg-black rounded-[50%]">
                        <Image src="/images/Services.svg" alt="lorry" width={70} height={70} />
                    </div>
                    <h1 className='font-semibold mb-[5px] text-[20px] text-black text-center'>{translation.main.free}</h1>
                    <p className=''>{translation.main.free2}</p>
                </div>

                <div className="w-fit">
                    <div className="w-fit border-collapse mb-[30px] m-auto border-[15px] border-gray-300 p-[15px] flex justify-center items-center bg-black rounded-[50%]">
                        <Image src="/images/naushnik.svg" alt="lorry" width={70} height={70} />
                    </div>
                    <h1 className='font-semibold mb-[5px] text-[20px] text-black text-center'>{translation.main.naush}</h1>
                    <p className=''>{translation.main.naush2}</p>
                </div>

                <div className="w-fit">
                    <div className="w-fit border-collapse mb-[30px] m-auto border-[15px] border-gray-300 p-[15px] flex justify-center items-center bg-black rounded-[50%]">
                        <Image src="/images/galochka.svg" alt="lorry" width={70} height={70} />
                    </div>
                    <h1 className='font-semibold mb-[5px] text-[20px] text-black text-center'>{translation.main.money}</h1>
                    <p className=''>{translation.main.money2}</p>
                </div>


            </div>

        </Layout>
    )

}