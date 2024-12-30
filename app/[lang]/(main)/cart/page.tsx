import Layout from "../Layout";
import Link from "@/node_modules/next/link";
import Image from "@/node_modules/next/image";
import { getDictionary } from "../../dictionaries";
import CartReload from "@/components/CartReload";
const data = Array(23).fill(1); // Пример данных




export default async function Cart({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)
    const Cartproducts = data.slice(0, 3);

    return (
        <Layout lang={lang} translation={translation}>
            <CartReload translation={translation} lang={lang} />
        </Layout>
    )
}