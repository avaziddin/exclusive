'use client';

import { useRouter, usePathname } from 'next/navigation';
import { i18n, Locale } from "@/i18n.config";

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { locales, defaultLocale } = i18n;

    const changeLanguage = (newLocale: Locale) => {
        // Получаем текущий путь без локали
        const segments = pathname.split('/').filter(Boolean);

        // Удаляем текущую локаль, если она есть
        if (locales.includes(segments[0] as Locale)) {
            segments.shift();
        }

        // Создаём новый путь с выбранной локалью
        const newPath = `/${newLocale}/${segments.join('/')}`;

        // Перенаправляем на новый путь
        router.push(newPath || `/${newLocale}`);
    };

    // Определяем текущую локаль
    const currentLocale = locales.includes(pathname.split('/')[1] as Locale)
        ? (pathname.split('/')[1] as Locale)
        : defaultLocale;

    return (

        <select
            value={currentLocale}
            onChange={(e) => changeLanguage(e.target.value as Locale)}
            className='absolute right-[6%] bg-black bg-none border-none outline-none'    >
            {locales.map((locale) => (
                <option className='absolute right-[6%] bg-black bg-none border-none outline-none' key={locale} value={locale}>
                    {locale.toUpperCase()}
                </option>
            ))}
        </select>
    );
};

export default LanguageSwitcher;
