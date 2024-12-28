import WishlistReload from "@/components/WishListReload";
import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";


export default async function wishlist({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)

    return (
        <Layout lang={lang} translation={translation}>
                <WishlistReload lang={lang} translation={translation} />
        </Layout>
    )
}
