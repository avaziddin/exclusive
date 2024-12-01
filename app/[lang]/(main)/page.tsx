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
    const res = await fetch("http://localhost:3000/api/category", { cache: "no-cache" });
    const { data } = await res.json();


    return (
        <Layout translation={translation} lang={lang}>
            {data.map((item: any) =>{
              return  <MainBanner item={item} lang={lang}/>
            })}
            <TodaysSales translation={translation} />
            <CategoryReload translation={translation} />
            <BestSellingProducts translation={translation}/>
            <MainBannerStatick translation={translation}/>
            <ExploreProduct translation={translation}/>
            <NewArial translation={translation}/>
            <Advantages translation={translation}/>
            <ScrollToTop/>
        </Layout>
    )
}
