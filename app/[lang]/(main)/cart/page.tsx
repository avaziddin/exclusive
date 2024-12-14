import Layout from "../Layout";
import { getDictionary } from "../../dictionaries";
import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
const data = Array(23).fill(1); // Пример данных




export default async function Cart({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)
    const Cartproducts = data.slice(0, 3);

    return (
        <Layout translation={translation}>
            <div className="flex gap-2 text-xl mt-20"> <Link href='/'><span className="text-gray-400">{translation.main.cart.home}</span></Link><span className="text-black">/</span> <span className="text-black">{translation.main.cart.cart}</span></div>
            <div className="mt-24 px-12 text-black">
            <div className="flex justify-between text-black">
                <span>{translation.main.cart.yag}</span>
                <span>{translation.main.cart.du}</span>
                <span>{translation.main.cart.se}</span>
                <span>{translation.main.cart.chor}</span>
            </div>
            <hr className="mt-10"/>

            <div className="flex flex-col gap-5 mt-10">
                {Cartproducts.map((_, index) => (
                    <div  className="flex flex-col gap-10" key={index}>
                        <div className="flex justify-between text-xl">
                            <div className="flex gap-5"><Image src="/images/televizor.svg" alt="tilvizir" width={60} height={20} /><span>LCD Monitor</span></div>
                            <span>$650</span>
                            <div className="w-[72px] h-[44px] gap-2 rounded-md flex border border-black justify-center items-center"><span>01</span><div className="flex flex-col gap-2"><Image src="/images/bolo.svg" alt="bolo" width={16} height={10} /><Image src="/images/pas.svg" alt="bolo" width={16} height={10} /></div></div>
                            <span>650$</span>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-between mt-10">
                <button className="border border-black w-[220px] h-[56px] rounded-lg">{translation.main.cart.firstbutton}</button>
                <button className="border border-black w-[220px] h-[56px] rounded-lg">{translation.main.cart.secondbutton}</button>
            </div>

            <div className="flex justify-between mt-12">
                <div className="flex gap-5">
                    <input type="text" placeholder="Coupon Code" className="w-[300px] h-[56px] pl-5 border border-black rounded-lg" />
                    <button className="w-[220px] h-[56px] text-white rounded-md bg-red-500 ">{translation.main.cart.thirdbutton}</button>
                </div>

                <div className="border border-black rounded-lg w-[470px] h-[330px]  gap-3 flex flex-col text-xl px-7 pt-10 ">
                    <h1 className="font-semibold text-[28px] mb-3 ">{translation.main.cart.carttotal}</h1>
                    <div className="flex justify-between"><span>{translation.main.cart.subtotal}</span><span>$1750</span></div>
                    <hr />
                    <div className="flex justify-between"><span>{translation.main.cart.shipping}</span> <span>{translation.main.cart.free}</span></div>
                    <hr />
                    <div className="flex justify-between"><span>{translation.main.cart.total}</span><span>$1750</span></div>
                    <div className="flex justify-center items-center">
                    <button className="w-[260px] h-[56px] bg-red-500 text-white rounded-lg ">{translation.main.cart.proses}</button>
                    </div>
                </div>
            </div>
            </div>

        </Layout>
    )
}