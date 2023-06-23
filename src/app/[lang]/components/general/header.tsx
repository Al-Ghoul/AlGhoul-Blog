
import type { TranslationFunctions } from '@/i18n/i18n-types';
import { usePathname } from 'next/navigation'

const Header = ({ LL, lang }: Props) => {
    const paths = usePathname().split('/');
    const currentActiveRoute = paths[paths.length - 1];
    const isArabic = lang == 'ar';

    return (
        <nav className="bg-gradient-to-bl from-[#4A3470] to-[#326C85] text-white border-b-[1px] border-black">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 ">
                <a href={`/${lang}`} className="flex items-center">
                    <span className='self-center text-xl md:text-3xl whitespace-nowrap text-[#f53c3c] font-aref'>{LL.siteTitle()}</span>
                </a>

                <div className="hidden w-full md:block md:w-auto">
                    <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm  md:border-0">
                        <li>
                            <a href={`/${lang}`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == lang ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg ' : ''}rounded md:bg-transparent  md:p-0 md:dark:text-white md:dark:bg-transparent`} aria-current="page">{LL.HOME_PAGE()}</a>
                        </li>

                        <li>
                            <a href={`${lang}/about`} className={`block py-2 pl-3 pr-4 
                            ${currentActiveRoute == 'about' ? 'text-blue-500' : 'text-white'}
                            ${isArabic ? 'font-medium text-lg' : ''}
                            rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0`}>{LL.ABOUT_US()}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

interface Props {
    LL: TranslationFunctions,
    lang: string,
}

export default Header;