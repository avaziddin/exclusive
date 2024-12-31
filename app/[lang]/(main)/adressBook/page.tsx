import Image from "next/image";
import { getDictionary } from "../../dictionaries";
import Layout from "./Layout";


export default async function About({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)

    return (
        <Layout translation={translation} lang={undefined}>
            <div className="w-full mt-[70px] mb-[100px] lg:flex-row xs:flex-col items-center flex text-[16px] text-black px-4 sm:px-6 md:px-[2%] py-7 h-fit shadow-slate-300">
                <div className="w-full mb-[5vh]">
                    <div className="flex mb-[15px] gap-5 items-center">
                        <Image src="/images/phone.svg" alt="hello" width={45} height={40} />
                        <span className="text-[16px] font-semibold">{translation.main.contact.call}</span>
                    </div>
                    <span className="block">{translation.main.contact.week}</span>
                    <span className="block">{translation.main.contact.phone}</span>
                </div>

                <div className="w-full">
                    <div className="flex mb-[15px] gap-5 items-center">
                        <Image src="/images/sms.svg" alt="hello" width={50} height={40} />
                        <span className="text-[16px] font-semibold">{translation.main.contact.write}</span>
                    </div>
                    <span className="block">{translation.main.contact.fill}</span>
                    <span className="block">Emails: customer@exclusive.com</span>
                    <span className="block">Emails: support@exclusive.com</span>
                </div>
            </div>

        </Layout>
    )

}