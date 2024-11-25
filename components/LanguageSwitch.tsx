'use client';

import { useRouter, usePathname } from 'next/navigation';
import { i18n, Locale } from "@/i18n.config";

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { locales, defaultLocale } = i18n;

    console.log(locales);


    const changeLanguage = (newLocale: Locale) => {
        const segments = pathname.split('/').filter(Boolean);

        if (locales.includes(segments[0] as Locale)) {
            segments.shift();
        }

        const newPath = `/${newLocale}/${segments.join('/')}`;

        router.push(newPath || `/${newLocale}`);
    };

    const currentLocale = locales.includes(pathname.split('/')[1] as Locale)
        ? (pathname.split('/')[1] as Locale)
        : defaultLocale;

    return (

        <select
            value={currentLocale}
            onChange={(e) => changeLanguage(e.target.value as Locale)}
            className="absolute right-[7%] w-[auto] bg-black bg-none border-none outline-none text-white "
        >
            <option
                className="bg-black text-white border-none outline-none"
                key={locales[0]}
                value={locales[0]}
            >
                {locales[0] === "ru" ? "Русский" : ""} 
            </option>

            <option
                className="bg-black text-white border-none outline-none"
                key={locales[1]}
                value={locales[1]}
            >
                {locales[1] === "en" ? "English" : ""} 
            </option>
        </select>


    );
};

export default LanguageSwitcher;
