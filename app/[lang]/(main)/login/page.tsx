import { getDictionary } from "../../dictionaries";
import Image from "@/node_modules/next/image";
import Layout from "./Layout";
import Login_form from "@/components/Login";

export default async function Login({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)
    return (
        <Layout translation={translation} lang={lang}>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-[15%] items-center py-[40px] px-4 sm:px-6 lg:px-8">
                {/* Изображение */}
                <div className="w-full lg:w-[40%]">
                    <Image
                        className="object-cover w-full h-auto"
                        src="/images/sing_in.svg"
                        alt="sign_up"
                        width={850}
                        height={100}
                    />
                </div>

                {/* Текстовая часть */}
                <div className="text-black flex w-full lg:w-fit flex-col gap-6 sm:gap-[2vh]">
                    {/* Заголовок и описание */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-[30px] sm:text-[40px] mb-2 sm:mb-[1vh] font-bold">
                            {translation.main.login.title}
                        </h1>
                    </div>

                    {/* Форма */}
                    <Login_form translation={translation} />

                    
                </div>
            </div>
        </Layout>
    )
}