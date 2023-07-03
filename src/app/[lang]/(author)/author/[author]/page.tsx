import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { allDocuments, isType } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { FilterByLang } from '@/helpers';
import CommonContainer from '@/components/general/CommonContainer';

export default async function AuthorPage({ params }: PageProps) {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);
    const author = allDocuments.filter(isType(['Author'])).filter(author => author.name.toLowerCase() == decodeURI(params.author).toLowerCase())[0];

    if (!!!author) notFound();

    const authorsPosts = allDocuments.filter(isType(['Post'])).filter(post => post.author.includes(author.name) && FilterByLang(post, params.lang));

    return (
        <CommonContainer lang={params.lang}
            header={LL.AUTHOR_POSTS_PAGE({ name: author.name })}
            contentList={authorsPosts}
            author={author}
        />
    );
}


interface PageProps {
    params: {
        lang: string,
        author: string
    }
}