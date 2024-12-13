import Image from "next/image";
import { getDictionary } from "../../dictionaries";
import Layout from "../Layout";
import ProductId from "@/components/ProductId";

interface PageProps {
  params: {
    id: string; // Динамический параметр
    lang: string; // Если язык тоже динамический
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id, lang } = params; // Получаем параметры маршрута
  const translation = await getDictionary(lang); // Используем lang для перевода

  return (
    <Layout translation={translation} lang={lang}>
      <div>
        <ProductId id={id} translation={translation} lang={lang}/>
      </div>
    </Layout>
  );
}
