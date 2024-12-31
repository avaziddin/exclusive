import { getDictionary } from "../../dictionaries";
import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import Layout from "../Layout";

export default async function Contact({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang);

    return (
        <Layout lang={undefined} translation={translation}>
            <div className="flex gap-2 text-lg mt-6 px-4 sm:px-8">
                <Link href='/'>
                    <span className="text-gray-400">{translation.main.contact.home}</span>
                </Link>
                <span className="text-black">/</span>
                <span className="text-black">{translation.main.contact.contact}</span>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-10 mb-16 px-4 sm:px-8">
                {/* Contact Information */}
                <div className="w-full lg:w-[40%] text-base text-black p-6 flex flex-col gap-5 shadow-lg shadow-slate-300">
                    <div className="flex gap-4 items-center">
                        <Image src="/images/phone.svg" alt="hello" width={45} height={40} />
                        <span className="text-lg font-semibold">{translation.main.contact.call}</span>
                    </div>
                    <span>{translation.main.contact.week}</span>
                    <span>{translation.main.contact.phone}</span>
                    <hr className="my-4" />
                    <div className="flex gap-4 items-center">
                        <Image src="/images/sms.svg" alt="hello" width={50} height={40} />
                        <span className="text-lg font-semibold">{translation.main.contact.write}</span>
                    </div>
                    <span>{translation.main.contact.fill}</span>
                    <span>Emails: customer@exclusive.com</span>
                    <span>Emails: support@exclusive.com</span>
                </div>

                {/* Contact Form */}
                <div className="w-full lg:w-[55%] mt-10 lg:mt-0 gap-6 shadow-lg text-base shadow-slate-300 p-6 flex flex-col">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="text" 
                            className="rounded w-full sm:w-1/3 h-12 pl-4 outline-none bg-gray-100 text-black" 
                            placeholder="Your Name *" 
                        />
                        <input 
                            type="text" 
                            className="rounded w-full sm:w-1/3 h-12 pl-4 outline-none bg-gray-100 text-black" 
                            placeholder="Your Email *" 
                        />
                        <input 
                            type="text" 
                            className="rounded w-full sm:w-1/3 h-12 pl-4 outline-none bg-gray-100 text-black" 
                            placeholder="Your Phone *" 
                        />
                    </div>
                    <textarea 
                        className="w-full rounded pl-4 pt-3 pb-16 bg-gray-100 outline-none text-black" 
                        placeholder="Your Message"
                    ></textarea>
                    <div className="flex justify-end">
                        <button className="text-white bg-red-500 w-full sm:w-1/3 p-3 rounded-lg outline-none">
                            {translation.main.contact.send}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
