
'use client';
import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { initFlowbite } from 'flowbite';
import { usePathname } from 'next/navigation'
import { SA, US } from 'country-flag-icons/react/3x2'
import { allDocuments, isType } from 'contentlayer/generated'
import Link from 'next/link';

const Header = async ({ lang }: Props) => {
    const paths = usePathname().split('/');
    const currentActiveRoute = paths[paths.length - 1];
    const isArabic = lang == 'ar';
    await loadLocaleAsync(lang as Locales);
    const LL = i18nObject(lang as Locales);
    const language = allDocuments.filter(isType(['Language'])).filter(language => language.code == lang)[0];

    if (typeof window !== 'undefined') {
        //do stuff related with dom
        initFlowbite();
    }

    return (
        <nav className="bg-gradient-to-bl from-[#4A3470] to-[#326C85] text-white border-b-[1px] border-black">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">

                <a href={`/${lang}`} className="flex items-center">
                    <span className='self-center text-xl md:text-3xl whitespace-nowrap text-[#f53c3c] font-aref'>{LL.siteTitle()}</span>
                </a>

                <div className="flex items-center md:order-2">
                    <button
                        type="button" data-dropdown-toggle="language-dropdown-menu"
                        className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-white rounded-lg cursor-pointer">
                        {
                            isArabic
                                ?
                                <SA title="United States" className='h-4 w-4 mr-1' />
                                :
                                <US title="United States" className='h-4 w-4 mr-1' />
                        }

                        {language.name}

                    </button>
                    <div className="z-50 hidden my-4 text-base list-none divide-y divide-gray-100 rounded-lg shadow bg-gradient-to-bl from-[#4A3470] to-[#326C85]" id="language-dropdown-menu">
                        <ul className="py-2 font-medium" role="none">
                            <li>
                                <a href={`/ar`} className="block px-4 py-2 text-sm hover:text-blue-400" role="menuitem">
                                    <div className="inline-flex items-center">
                                        <SA title="United States" className='h-4 w-4 mr-1' /> العربية (KSA)
                                    </div>
                                </a>
                            </li>
                            <li>
                                <Link href={`/en`} className="block px-4 py-2 text-sm hover:text-blue-400" role="menuitem">
                                    <div className="inline-flex items-center">
                                        <US title="United States" className='h-4 w-4 mr-1' /> English (US)
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>

                <div className="hidden w-full md:block md:w-auto p-5 md:p-0 items-center" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm  md:border-0">
                        <li>
                            <a href={`/${lang}`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == lang ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg ' : ''}rounded md:bg-transparent md:p-0 md:hover:text-blue-700`} aria-current="page">{LL.HOME_PAGE()}</a>
                        </li>

                        <li>
                            <a href={`/${lang}/tags`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == 'tags' ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg ' : ''}rounded md:bg-transparent md:p-0 md:hover:text-blue-700`} aria-current="page">{LL.TAGS_PAGE()}</a>
                        </li>

                        <li>
                            <a href={`/${lang}/authors`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == 'authors' ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg ' : ''}rounded md:bg-transparent md:p-0 md:hover:text-blue-700`} aria-current="page">{LL.AUTHORS_PAGE()}</a>
                        </li>

                        <li>
                            <a href={`/${lang}/about`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == 'about' ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg' : ''}
                            roundedmd:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>{LL.ABOUT_US()}</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

interface Props {
    lang: string,
}

export default Header;