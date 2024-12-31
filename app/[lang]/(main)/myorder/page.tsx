import Link from "@/node_modules/next/link";
import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";
import MyOrderReload from "@/components/MyOrdersReload";


export default async function MyOrder({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)

    return (
        <Layout lang={lang} translation={translation} >
            <MyOrderReload translation={translation} lang={lang}/>
        </Layout>
    )
}
