import MainBanner from "@/components/MainBanner"
import Layout from "./Layout"

export default async function Home() {

    return (
        <Layout>
            <MainBanner children={undefined}/>
        </Layout>
    )
}