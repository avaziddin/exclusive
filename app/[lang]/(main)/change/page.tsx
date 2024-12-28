import { getDictionary } from "../../dictionaries";
import Layout from "./Layout";
import Change_page from "@/components/Change_page";


export default async function About({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)

    return (
        <Layout translation={translation} lang={undefined}>
            <Change_page translation={translation}/>
        </Layout>
    )

}