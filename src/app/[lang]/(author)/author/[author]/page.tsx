import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import CommonContainer from '@/components/general/CommonContainer';
import { GetAuthorByName, GetPostsByAuthorAndLanguage } from '@/helpers/db';
import { Metadata } from 'next'
import { CapitalizeFirstLetter } from '@/helpers';
import { notFound } from 'next/navigation';


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);
    const authorName = decodeURI(params.author);

    return {
        title: `${LL.siteTitle()} - ${CapitalizeFirstLetter(authorName)}`,
    }
}

export default async function AuthorPage({ params }: PageProps) {
    const author = await GetAuthorByName(decodeURI(params.author));
    if (!author) notFound();
    const authorsPosts = await GetPostsByAuthorAndLanguage(author.name, params.lang);
    if (!authorsPosts.length) notFound();

    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <CommonContainer
            lang={params.lang}
            header={LL.AUTHOR_POSTS_PAGE({ name: params.author })}
            contentList={authorsPosts}
            author={author}
        />
    );
}


interface PageProps {
    params: {
        lang: string,
        author: string,
    }
}