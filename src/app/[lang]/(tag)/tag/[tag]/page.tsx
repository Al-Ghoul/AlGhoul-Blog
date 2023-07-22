import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import { CapitalizeFirstLetter, getBaseUrl, getMetaData } from '@/helpers';
import CommonContainer from '@/components/general/CommonContainer';
import { notFound } from 'next/navigation';
import type { Posts } from '@/helpers/db';

async function GetPosts(tagName: string, languageCode: string) {
    const res = await fetch(`${getBaseUrl()}/api/tag/${languageCode}/${tagName}`, { next: { tags: ["tagsPosts"] } });

    if (!res.ok) throw new Error("Failed fetch data");

    return res.json() as Promise<{posts: Posts}>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const tag = decodeURI(params.tag);
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: CapitalizeFirstLetter(tag),
        ...getMetaData(
            {
                params: {
                    title: `${LL.siteTitle()} | ${CapitalizeFirstLetter(tag)}`,
                    languageCode: params.lang,
                    description: LL.DESCRIPTION(),
                    currentPath: `/tag/${tag}`,
                }
            }
        )
    }
}

export default async function TagPage({ params }: PageProps) {
    const { posts } = await GetPosts(params.tag, params.lang).catch(() => notFound());
    if (!posts.length) notFound();
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <CommonContainer
            lang={params.lang}
            header={`${LL.TAGS_PAGE()} - ${decodeURI(params.tag)}`}
            contentList={posts}
        />
    );
}



interface PageProps {
    params: {
        lang: Locales,
        tag: string,
    }
}