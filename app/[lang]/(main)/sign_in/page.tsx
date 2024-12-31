
import { getDictionary } from "../../dictionaries";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import Layout from "./Layout";
import Sing_up from "@/components/sing_up";

export default async function Sign_in({ params: { lang }, }: { params: { lang: string }; }) {
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
                            {translation.main.sign_up.title}
                        </h1>
                        <span className="text-[16px] sm:text-[18px]">{translation.main.sign_up.span}</span>
                    </div>

                    {/* Форма */}
                    <Sing_up translation={translation} />

                    {/* Ссылка для входа */}
                    <div className="flex justify-center lg:justify-start items-center gap-4 text-center lg:text-left">
                        <span>{translation.main.sign_up.account}</span>
                        <Link href="/login">
                            <span className="font-bold underline decoration-1">{translation.main.sign_up.login}</span>
                        </Link>
                    </div>
                </div>
            </div>

        </Layout>
    )
}