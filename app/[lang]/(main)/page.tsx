import MainBanner from "@/components/MainBanner"
import Layout from "./Layout"
import { getDictionary } from "../dictionaries";
import TodaysSales from "@/components/TodaysSales";

export default async function Home({ params: { lang }, }: { params: { lang: string };}) {
    const translation = await getDictionary(lang)


    return (
        <Layout translation={translation} lang={lang}>
            <MainBanner/>
           <TodaysSales translation={translation} />
        </Layout>
    )
}
