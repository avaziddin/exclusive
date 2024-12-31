import React, { cache } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import MyOrderReloadDashboard from '@/components/MyOrdersReloadDashboard';

interface PageProps {
  params: { lang: string };
}

export default async function Page({ params: { lang } }: PageProps) {
  const translation = await getDictionary(lang);



  return (
    <>
      <MyOrderReloadDashboard lang={lang}/>
    </>
  );
};
