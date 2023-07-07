
'use client';
import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { initFlowbite } from 'flowbite';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import LanguageSelector from './LanguageSelector';

const Header = async ({ lang }: Props) => {
    const paths = usePathname().split('/');
    const currentActiveRoute = paths[paths.length - 1];
    const isArabic = lang == 'ar';
    await loadLocaleAsync(lang as Locales);
    const LL = i18nObject(lang as Locales);


    if (typeof window !== 'undefined') {
        //do stuff related with dom
        initFlowbite();
    }

    return (
        <nav className="bg-gradient-to-bl from-[#4A3470] to-[#326C85] text-white border-b-[1px] border-black">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">

                <Link href={`/${lang}`} className="flex items-center">
                    <span className='self-center text-xl md:text-3xl whitespace-nowrap text-[#f53c3c] font-aref'>{LL.siteTitle()}</span>
                </Link>

                <LanguageSelector languageCode={lang} />

                <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>

                <div className="hidden w-full md:block md:w-auto p-5 md:p-0 items-center" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm  md:border-0">
                        <li>
                            <Link href={`/${lang}`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == lang ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg ' : ''}rounded md:bg-transparent md:p-0 md:hover:text-blue-700`} aria-current="page">{LL.HOME_PAGE()}
                            </Link>
                        </li>

                        <li>
                            <Link href={`/${lang}/tags`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == 'tags' ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg ' : ''}rounded md:bg-transparent md:p-0 md:hover:text-blue-700`} aria-current="page">{LL.TAGS_PAGE()}
                            </Link>
                        </li>

                        <li>
                            <Link href={`/${lang}/authors`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == 'authors' ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg ' : ''}rounded md:bg-transparent md:p-0 md:hover:text-blue-700`} aria-current="page">{LL.AUTHORS_PAGE()}
                            </Link>
                        </li>

                        <li>
                            <Link href={`/${lang}/topics`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == 'topics' ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg' : ''}
                            rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>{LL.TOPICS_PAGE()}
                            </Link>
                        </li>

                        <li>
                            <Link href={`/${lang}/about`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == 'about' ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg' : ''}
                            rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>{LL.ABOUT_US()}
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

interface Props {
    lang: 'en' | 'ar',
}

export default Header;