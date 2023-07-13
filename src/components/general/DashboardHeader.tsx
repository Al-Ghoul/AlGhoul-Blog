import HeaderContainer from './HeaderContainer';
import { loadLocaleAsync } from '@/i18n/i18n-util.async'
import { i18nObject } from '@/i18n/i18n-util'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation';

const DashboardHeader = async ({ lang }: Props) => {
    const session = await getServerSession(authOptions);
    if (!session) redirect(`/${lang}`);
    await loadLocaleAsync(lang);
    const LL = i18nObject(lang);

    return (
        <HeaderContainer lang={lang} />
    );
}

interface Props {
    lang: 'en' | 'ar',
}

export default DashboardHeader;