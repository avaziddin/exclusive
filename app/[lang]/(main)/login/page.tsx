import { getDictionary } from "../../dictionaries";
import Image from "@/node_modules/next/image";
import Layout from "./Layout";
import Login_form from "@/components/Login";

export default async function Login({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)
    return (
        <Layout translation={translation} lang={lang}>
            <div className="flex gap-[15%] items-center py-[40px]">
                <div className="w-[40%]">
                    <Image className="object-cover" src="/images/sing_in.svg" alt="sign_up" width={850} height={100} />
                </div>

                <div className="text-black flex w-fit flex-col gap-[2vh]">
                    <div>
                        <h1 className="text-[40px] mb-[1vh] whitespace-nowrap font-bold ">{translation.main.login.title}</h1>
                        <span className=" text-[18px]">{translation.main.login.span}</span>
                    </div>

                    <Login_form translation={translation} />

                </div>
            </div>
        </Layout>
    )
}