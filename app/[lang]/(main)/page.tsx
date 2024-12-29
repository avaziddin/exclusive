import MainBanner from "@/components/MainBanner"
import Layout from "./Layout"
import { getDictionary } from "../dictionaries";
import TodaysSales from "@/components/TodaysSales";
import CategoryReload from "@/components/CategoryReload";
import BestSellingProducts from "@/components/BestSellingProducts";
import MainBannerStatick from "@/components/MainBannerStatick";
import ExploreProduct from "@/components/ExploreProducts";
import NewArial from "@/components/NewArial";
import Advantages from "@/components/Advantages";
import ScrollToTop from "@/components/ScrollToTop";

export default async function Home({ params: { lang }, }: { params: { lang: string }; }) {
    
    const translation = await getDictionary(lang)

    return (
        <Layout translation={translation} lang={lang}>
            <MainBanner lang={lang}/>
            <TodaysSales translation={translation} lang={lang}/>
            <CategoryReload translation={translation} />
            <BestSellingProducts lang={lang} translation={translation}/>
            <MainBannerStatick translation={translation}/>
            <ExploreProduct translation={translation}/>
            <NewArial translation={translation}/>
            <Advantages translation={translation}/>
            <ScrollToTop/>
        </Layout>
    )
}
