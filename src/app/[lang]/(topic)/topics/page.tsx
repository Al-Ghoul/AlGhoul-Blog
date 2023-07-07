import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import CommonContainer from '@/components/general/CommonContainer';
import { GetTopicsByLanguage } from '@/helpers/db';
import { notFound } from 'next/navigation';


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: `${LL.siteTitle()} - ${LL.TOPICS_PAGE()}`,
    }
}

export default async function TopicsPage({ params }: PageProps) {
    const topics = await GetTopicsByLanguage(params.lang);
    if (!topics.length) notFound();
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <CommonContainer
            lang={params.lang}
            header={LL.TOPICS_PAGE()}
            contentList={topics}
        />
    );
}

interface PageProps {
    params: {
        lang: string,
    }
}