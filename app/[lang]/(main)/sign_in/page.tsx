
import { getDictionary } from "../../dictionaries";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import Layout from "./Layout";
import Sing_up from "@/components/sing_up";

export default async function Sign_in({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)

    return (
        <Layout translation={translation} lang={lang}>
            <div className="flex gap-[15%] items-center py-[40px]">
                <div className="w-[40%]">
                    <Image className="object-cover" src="/images/sing_in.svg" alt="sign_up" width={850} height={100} />
                </div>

                <div className="text-black flex w-fit flex-col gap-[2vh]">
                    <div>
                        <h1 className="text-[40px] mb-[1vh] whitespace-nowrap font-bold ">{translation.main.sign_up.title}</h1>
                        <span className="text-[18px]">{translation.main.sign_up.span}</span>
                    </div>

                    <Sing_up translation={translation}/>

                    <div className="flex justify-center items-center gap-4"> <span>{translation.main.sign_up.account}</span><Link href='/login'><span className="font-bold underline decoration-1">{translation.main.sign_up.login}</span></Link></div>

                </div>
            </div>
        </Layout>
    )
}