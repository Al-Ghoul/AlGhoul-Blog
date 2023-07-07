import Link from "next/link";
import { SA, US } from 'country-flag-icons/react/3x2'


const LanguageSelector = ({ languageCode }: Props) => {
    const isArabic = languageCode == 'ar';
    const languages = { "en": "English (US)", "ar": "العربية (KSA)" };
    const language = languages[languageCode];

    return (
        <div className="flex items-center md:order-2">
            <button
                type="button" data-dropdown-toggle="language-dropdown-menu"
                className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-white rounded-lg cursor-pointer">
                {
                    isArabic
                        ?
                        <SA title="Kingdom Saudi Arabia" className='h-4 w-4 mr-1' />
                        :
                        <US title="United States" className='h-4 w-4 mr-1' />
                }

                {language}

            </button>
            <div className="z-50 hidden my-4 text-base list-none divide-y divide-gray-100 rounded-lg shadow bg-gradient-to-bl from-[#4A3470] to-[#326C85]" id="language-dropdown-menu">
                <ul className="py-2 font-medium" role="none">
                    <li>
                        <Link href="/ar" className="block px-4 py-2 text-sm hover:text-blue-400" role="menuitem">
                            <div className="inline-flex items-center">
                                <SA title="United States" className='h-4 w-4 mr-1' /> العربية (KSA)
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/en" className="block px-4 py-2 text-sm hover:text-blue-400" role="menuitem">
                            <div className="inline-flex items-center">
                                <US title="United States" className='h-4 w-4 mr-1' /> English (US)
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

interface Props {
    languageCode: 'en' | 'ar',
}

export default LanguageSelector;