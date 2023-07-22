import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import CommonContainer from '@/components/general/CommonContainer';
import type { Topics } from '@/helpers/db';
import { notFound } from 'next/navigation';
import { getBaseUrl, getMetaData } from '@/helpers';

async function GetTopics(languageCode: string) {
    const res = await fetch(`${getBaseUrl()}/api/topics/${languageCode}`, { next: { tags: ["topics"] } });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json() as Promise<Topics>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: LL.TOPICS_PAGE(),
        description: LL.DESCRIPTION_TOPICS(),
        ...getMetaData(
            {
                params: {
                    title: `${LL.siteTitle()} | ${LL.TOPICS_PAGE()}`,
                    languageCode: params.lang,
                    description: LL.DESCRIPTION_TOPICS(),
                    currentPath: '/topics',
                }
            }
        )
    }
}

export default async function TopicsPage({ params }: PageProps) {
    const topics = await GetTopics(params.lang);
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
        lang: Locales,
    }
}