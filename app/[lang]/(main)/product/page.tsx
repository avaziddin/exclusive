import Link from "@/node_modules/next/link";
import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";
const data = Array(23).fill(1); // Пример данных
import Image from "@/node_modules/next/image";


export default async function Contact({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang) 
    const Cartproducts = data.slice(0, 4);

    return (
        <Layout translation={translation}>
        <div className="flex gap-2 text-xl mt-20"> <Link href='/'><span className="text-gray-400">{translation.main.product.account}</span></Link><span className="text-gray-400">/</span><span className="text-gray-400">{translation.main.product.gaming}</span> <span className="text-gray-400">/</span> <span className="text-black">{translation.main.product.have}</span></div>

        <div className="flex h-[620px] gap-10 mt-24">
            
            <div className="flex flex-col justify-between">
        {Cartproducts.map((_, index) => (
            <Image src="/images/hhhhh.svg" alt="hello" width={175} height={11} /> 
                ))}
                </div>

                <Image src="/images/botur.svg" alt="hello" width={520} height={100} />
                

                <div className="flex flex-col text-black h-[620px] justify-between ml-5 ">
                    <h1 className="text-[28px] font-bold">Havic HV G-92 Gamepad</h1>
                    <div className="flex gap-4 items-center"><Image src="/images/star.svg" alt="hello" width={100} height={100} /> <span className="text-[14px] text-gray-400">(150 Reviews)    </span><span className="text-gray-400">|</span> <span className="text-green-400">In Stock</span></div> 
                    <span className="text-xl font-semibold">$192.00</span>
                    <span>PlayStation 5 Controller Skin High quality vinyl with air channel <br /> adhesive for easy bubble free install & mess  free removal <br /> Pressure sensitive.</span>
                    <hr />
                    <div className="flex gap-6  "> <span>{translation.main.product.colors}</span> <div className="flex gap-3"><Image src="/images/kaut.svg" alt="hello" width={20} height={10} /><Image src="/images/surx.svg" alt="hello" width={20} height={10} /></div></div>
                    <div className="flex items-center gap-5">
                    <span>{translation.main.product.size}</span>
                    <div className="w-[34px] h-[34px] border border-gray-400 flex justify-center items-center font-semibold text-[15px] rounded-md">XS</div>
                    <div className="w-[34px] h-[34px] border border-gray-400 flex justify-center items-center font-semibold text-[15px] rounded-md">S</div>
                    <div className="w-[34px] h-[34px] border  flex justify-center items-center font-semibold text-[15px] bg-red-500 rounded-md">M</div>
                    <div className="w-[34px] h-[34px] border border-gray-400 flex justify-center items-center font-semibold text-[15px] rounded-md">L</div>
                    <div className="w-[34px] h-[34px] border border-gray-400 flex justify-center items-center font-semibold text-[15px] rounded-md">XL</div>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex w-[160px] h-[44px]   ">
                            <div  className="border border-gray-400 flex justify-center items-center text-black text-[40px] w-[40px]">-</div>
                            <div className="w-[80px] font-semibold border border-gray-400 text-[20px] flex justify-center items-center">2</div>
                            <div className="w-[42px] bg-red-500 text-white flex justify-center items-center text-[25px]">+</div>
                        </div>
                        <button className="text-white bg-red-500 rounded-md w-[170px] h-[45px] ">{translation.main.product.buy}</button>
                        <div className="border border-gray-400 rounded-md w-[40px] flex justify-center items-center"><Image src="/images/like.svg" alt="hello" width={30} height={20} /></div>
                    </div>

                    <div>
                        <div className="border border-gray-400  w-[420px] px-5 h-[90px] flex items-center gap-5">
                            <Image src="/images/delivery.svg" alt="hello" width={40} height={40} />
                            <div>
                                <h1 className="font-semibold tetx-[18px]">{translation.main.product.free}</h1>
                                <span className="underline decoration-slice">{translation.main.product.enter}</span>
                            </div>
                        </div>
                        <div className="border border-gray-400  w-[420px] px-5 h-[90px] flex items-center gap-5">
                            <Image src="/images/return.svg" alt="hello" width={40} height={40} />
                            <div>
                                <h1 className="font-semibold tetx-[18px]">{translation.main.product.return}</h1>
                                <span className="underline decoration-slice">{translation.main.product.details}</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </Layout>
    )
}