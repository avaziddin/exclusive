import Slider from "@/components/Corusel";
import Image from "next/image";
import Layout from "./Layout";
import { getDictionary } from "../dictionaries";
import Timer from "@/components/Timer";
import Sales from "@/components/Sales";
import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import BestsellingItems from "@/components/BestsellingItems";
import Statick from "@/components/Statick";
import Explore from "@/components/Explore";

export default async function Home({ params: { lang }, }: { params: { lang: string }; }) {
  const translation = await getDictionary(lang)
  return (
    <>
      <Layout translation={translation}>
          <Banner></Banner>
          <Sales translation={translation}></Sales>  
          <Categories translation={translation}></Categories>
          <BestsellingItems translation={translation}/>
          <Statick translation={translation}/>
          <Explore translation={translation}/>
      </Layout>
    </>
  );
}

