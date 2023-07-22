import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import CommonContainer from '@/components/general/CommonContainer';
import { Metadata } from 'next'
import { CapitalizeFirstLetter, getBaseUrl, getMetaData } from '@/helpers';
import { notFound } from 'next/navigation';
import type { Authors, AuthorsPostsType } from '@/helpers/db';

async function GetAuthorWithPosts(authorName: string, languageCode: string) {
    const res = await fetch(`${getBaseUrl()}/api/author/${languageCode}/${authorName}`, { next: { tags: ["authorsPosts"] } })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json() as Promise<{ authorsPosts: AuthorsPostsType, author: Authors[0] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const authorName = decodeURI(params.author);
    const data = await GetAuthorWithPosts(decodeURI(params.author), params.lang).catch(() => notFound());
    if (!data || !data.authorsPosts.length) notFound();
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    const { openGraph, twitter, alternates } = getMetaData(
        {
            params: {
                title: `${LL.siteTitle()} | ${CapitalizeFirstLetter(authorName)}`,
                languageCode: params.lang,
                description: data.author.bio,
                currentPath: `/author/${data.author.name}`,
                dropAlternates: true
            }
        }
    );

    return {
        title: CapitalizeFirstLetter(authorName),
        description: data.author.bio,
        alternates: {
            ...alternates
        },
        openGraph: {
            ...openGraph,
            type: 'profile',
            username: data.author.name,
            locale: params.lang,
        },
        twitter: {
            ...twitter,
        }
    }
}

export default async function AuthorPage({ params }: PageProps) {
    const data = await GetAuthorWithPosts(decodeURI(params.author), params.lang).catch(() => notFound());
    if (!data || !data.authorsPosts.length) notFound();

    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <CommonContainer
            lang={params.lang}
            header={LL.AUTHOR_POSTS_PAGE({ name: data.author.name })}
            contentList={data.authorsPosts}
            author={data.author}
        />
    );
}


interface PageProps {
    params: {
        lang: Locales,
        author: string,
    }
}