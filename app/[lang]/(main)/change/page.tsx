
import Link from "@/node_modules/next/link";
import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";


export default async function About({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang) 

    return (
        <Layout translation={translation} lang={undefined}>
            
            <div className="flex justify-between mt-20 items-center">
                <div className="flex gap-2 text-xl">
                <Link href='/'><span className="text-gray-400">{translation.main.account.home}</span></Link>
                <span className="text-black">/</span>
                <span className="text-black">{translation.main.account.my}</span>
                </div>

                <div className="text-black text-xl flex gap-5">
                    <span>{translation.main.account.welcome}</span>
                    <span className="text-red-500">{translation.main.account.md}</span>
                </div>
            </div>

            <div className="flex justify-between mt-28">

                <div className="flex flex-col gap-4  w-[350px]  text-black ">
                    <h1 className="text-[22px] font-semibold">{translation.main.account.manage}</h1>
                    <div className="flex flex-col pl-10 gap-3 text-gray-400">
                        <span className="text-red-500">{translation.main.account.myprofile}</span>
                        <span>{translation.main.account.adressbook}</span>
                        <span>{translation.main.account.payment}</span>
                    </div>
                    <h1 className="text-[22px] font-semibold">{translation.main.account.orders}</h1>
                    <div className="flex flex-col pl-10 gap-3 text-gray-400">
                        <span>{translation.main.account.returns}</span>
                        <span>{translation.main.account.canseltations}</span>
                    </div>
                    <h1 className="text-[22px] font-semibold">{translation.main.account.wishlist}</h1>
                </div>


                <div className=" py-10 text-black shadow-xl w-[880px] px-[85px]">
                    <h1 className="text-[24px] text-red-500 font-semibold mb-5">{translation.main.account.edit}</h1>

                    <div className="flex flex-wrap gap-6">

                        <div className="flex flex-col gap-2">
                            <span>{translation.main.account.first}</span>
                            <input type="text" placeholder="MD" className="w-[340px] h-[50px] bg-zinc-100 outline-none pl-4" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>{translation.main.account.last}</span>
                            <input type="text" placeholder="Rimel" className="w-[340px] h-[50px] bg-zinc-100 outline-none pl-4" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>Email</span>
                            <input type="text"  placeholder="Rimelrimel1111@gmail.com" className="w-[340px] h-[50px] bg-zinc-100 outline-none pl-4" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span>{translation.main.account.adress}</span>
                            <input type="text" placeholder="Kingston, 5236, United State" className="w-[340px] h-[50px] bg-zinc-100 outline-none pl-4" />
                        </div>

                    </div>

                    <div className="flex flex-col gap-3 mt-5">
                        <h1 className="text-[24px] font-semibold">{translation.main.account.password}</h1>
                        <input type="text" className="w-[710px] h-[50px] bg-zinc-100 pl-4" placeholder="Current Passwod" />
                        <input type="text" className="w-[710px] h-[50px] bg-zinc-100 pl-4" placeholder="New Passwod" />
                        <input type="text" className="w-[710px] h-[50px] bg-zinc-100 pl-4" placeholder="Confirm New Passwod" />
                        <div className="flex gap-5 justify-end mt-2">
                            <button>{translation.main.account.cancel}</button>
                            <button className="w-[220px] h-[56px] rounded-md text-white bg-red-500">{translation.main.account.save}</button> 
                        </div>
                    </div>
                </div>


            </div>
        </Layout>
    )
        
}