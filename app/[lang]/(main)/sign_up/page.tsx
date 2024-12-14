import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";

export default async function Sign_up({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)
    return (
        <Layout translation={translation}>
            <div className="flex justify-between items-center py-20">
                <Image src="/images/Image.svg" alt="sign_up" width={850} height={100} />

                <div className="text-black flex w-[400px] flex-col gap-8">
                    <div>
                    <h1 className="text-[40px] font-bold ">{translation.main.sign_up.title}</h1>
                    <span>{translation.main.sign_up.span}</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                    <input type="text" placeholder="Name" className="text-black py-2  outline-none" />
                    <hr />
                    </div>
                    <div>
                    <input type="text" placeholder="Email or Phone Number" className="text-black py-2  outline-none" />
                    <hr />
                    </div>    <div>
                    <input type="text" placeholder="Password" className="text-black py-2  outline-none" />
                    <hr />
                    </div>
                    <button className="w-[371px] h-[56px] text-white font-bold bg-red-500 rounded-xl">{translation.main.sign_up.create}</button>
                    <div className="flex justify-center items-center border w-[371px] h-[60px] gap-3 border-black rounded-xl"> <Image src="/images/googlee.svg" alt="google" width={20} height={10}/><span>{translation.main.sign_up.google}</span> </div>
                    </div>
                    <div className="flex justify-center items-center gap-4"> <span>{translation.main.sign_up.account}</span><Link href='/login'><span className="font-bold underline decoration-1">{translation.main.sign_up.login}</span></Link></div>
 
                </div>
            </div>
        </Layout>
    )
}