import MainBanner from "@/components/MainBanner"
import Layout from "./Layout"
import { getDictionary } from "../dictionaries";
import TodaysSales from "@/components/TodaysSales";
import CategoryReload from "@/components/CategoryReload";

export default async function Home({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)


    return (
        <Layout translation={translation} lang={lang}>
            <MainBanner />
            <TodaysSales translation={translation} />
            <div className="px-[7%]">
                <div className="flex mb-[20px] gap-[10px] items-center ">
                    <div className="w-[20px] h-[40px] rounded-lg bg-red-500"></div>
                    <h1 className="text-[16px] font-semibold text-red-500">Categories</h1>
                </div>
                <h1 className="text-[36px] font-semibold text-black">Browse By Category</h1>
                <CategoryReload/>
            </div>
        </Layout>
    )
}
