import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";

export default async function Login({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)
    return (
        <Layout translation={translation}>
            <div className="flex justify-between items-center py-20">
                <Image src="/images/Image.svg" alt="sign_up" width={850} height={100} />

                <div className="text-black flex flex-col gap-8">
                    <div>
                    <h1 className="text-[40px] font-bold ">{translation.main.login.title}</h1>
                    <span>{translation.main.login.span}</span>
                    </div>
                    <div className="flex flex-col gap-4">
                    <div>
                    <input type="text" placeholder="Email or Phone Number" className="text-black py-2  outline-none" />
                    <hr />
                    </div>    <div>
                    <input type="text" placeholder="Password" className="text-black py-2  outline-none" />
                    <hr />
                    </div>
            </div>

            <div className="flex w-full justify-between items-center">
                <button className="bg-red-500 w-[143px] h-[56px] text-white rounded-lg">{translation.main.login.login}</button>
                <span className="text-red-500">{translation.main.login.password}</span>
            </div>
    
 
                </div>
            </div>
        </Layout>
    )
}