import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import { CapitalizeFirstLetter } from '@/helpers';
import CommonContainer from '@/components/general/CommonContainer';
import { GetPostsByTopicIdAndLanguage, GetTopicByIdAndLanguage } from '@/helpers/db';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);
    const topic = await GetTopicByIdAndLanguage(params.topicId, params.lang);

    return {
        title: `${LL.siteTitle()} - ${CapitalizeFirstLetter(topic!.translation)}`,
    }
}

export default async function TopicPage({ params }: PageProps) {
    const topic = await GetTopicByIdAndLanguage(params.topicId, params.lang);
    if (!topic) notFound();
    const posts = await GetPostsByTopicIdAndLanguage(params.topicId, params.lang);
    if (!posts.length) notFound();
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <CommonContainer
            lang={params.lang}
            header={`${LL.TOPICS_PAGE()} - ${topic.translation}`}
            contentList={posts}
        />
    );
}



interface PageProps {
    params: {
        lang: string,
        topicId: number,
    }
}