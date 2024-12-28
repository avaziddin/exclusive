import { getDictionary } from "../../dictionaries";
import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import Layout from "../Layout";


export default async function Contact({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang) 
    return (
        <Layout lang={undefined} translation={translation}>
            <div className="flex gap-2 text-xl mt-[50px]"> <Link href='/'><span className="text-gray-400">{translation.main.contact.home}</span></Link><span className="text-black">/</span> <span className="text-black">{translation.main.contact.contact}</span></div>
            <div className="flex justify-between mt-[60px] mb-[100px]">
                <div className="w-[40%] text-[18px] text-black px-10 flex flex-col justify-around py-7  shadow-lg shadow-slate-300">
                    <div className="flex gap-5 items-center"> <Image src="/images/phone.svg" alt="hello" width={45} height={40} /> <span className="text-[18px] font-semibold">{translation.main.contact.call}</span> </div>
                    <span>{translation.main.contact.week}</span>
                    <span>{translation.main.contact.phone}</span>
                    <hr />
                    <div className="flex gap-5 items-center"> <Image src="/images/sms.svg" alt="hello" width={50} height={40} /> <span className="text-[18px] font-semibold">{translation.main.contact.write}</span> </div>
                    <span>{translation.main.contact.fill}</span>
                    <span>Emails: customer@exclusive.com</span>
                    <span>Emails: support@exclusive.com</span>
                </div>
                <div className="w-[55%] gap-[3vh] shadow-lg text-[18px] shadow-slate-300 px-10 py-10 flex flex-col justify-around">
                    <div className="flex justify-between">
                        <input type="text" className="rounded w-[255px] h-[50px] pl-5 outline-none bg-gray-100  text-black" placeholder="Your Name *"/>
                        <input type="text" className="rounded w-[255px] h-[50px] pl-5 outline-none bg-gray-100  text-black" placeholder="Your Email *"/>
                        <input type="text" className="rounded w-[255px] h-[50px] pl-5 outline-none bg-gray-100  text-black" placeholder="Your Phone *"/>
                    </div>
                    <input type="text" className="w-full rounded pl-5 h-[210px] bg-gray-100  outline-none text-black" placeholder="Your Massage" />
                    <div className="flex justify-end">
                        <button className="text-white bg-red-500 w-[30%] p-[15px] rounded-lg outline-none">{translation.main.contact.send}</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

