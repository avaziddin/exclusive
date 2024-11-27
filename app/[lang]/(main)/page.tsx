import MainBanner from "@/components/MainBanner"
import Layout from "./Layout"
import { getDictionary } from "../dictionaries";
import TodaysSales from "@/components/TodaysSales";
import CategoryReload from "@/components/CategoryReload";
import BestSellingProducts from "@/components/BestSellingProducts";
import MainBannerStatick from "@/components/MainBannerStatick";
import ExploreProduct from "@/components/ExploreProducts";

export default async function Home({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)


    return (
        <Layout translation={translation} lang={lang}>
            <MainBanner />
            <TodaysSales translation={translation} />
            <CategoryReload translation={translation} />
            <BestSellingProducts translation={translation}/>
            <MainBannerStatick translation={translation}/>
            <ExploreProduct translation={translation}/>
        </Layout>
    )
}
