import Link from "@/node_modules/next/link";
import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";
import CheckoutForm from "@/components/CheckoutForm";


export default async function Checkout({ params: { lang }, }: { params: { lang: string }; }) {
    const translation = await getDictionary(lang)

    return (
        <Layout lang={lang} translation={translation}>

            <div className="flex gap-4 text-xl mt-[50px]">
                <Link href='/'><span className="text-gray-400">{translation.main.checkout.account}</span></Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{translation.main.checkout.my}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{translation.main.checkout.product}</span>
                <span className="text-gray-400">/</span>
                <span className="text-black">{translation.main.checkout.checkout}</span>
            </div>

            <h1 className="text-[38px] font-semibold text-black mt-[50px]">Billing Details</h1>



            <CheckoutForm translation={translation} lang={lang} />


        </Layout>
    )
}
