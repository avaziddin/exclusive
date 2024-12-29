import AllProd from "@/components/AllProd";
import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";


export default async function allProd({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)

    return (
        <Layout translation={translation} lang={undefined}>
            <AllProd translation={translation}/>
        </Layout>
    )

}