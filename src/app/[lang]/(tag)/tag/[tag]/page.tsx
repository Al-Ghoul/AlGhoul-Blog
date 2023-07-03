import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import { allDocuments, isType } from 'contentlayer/generated'
import { CapitalizeFirstLetter, FilterByLang } from '@/helpers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CommonContainer from '@/components/general/CommonContainer';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);
    const tag = decodeURI(params.tag);

    return {
        title: `${LL.siteTitle()} - ${CapitalizeFirstLetter(tag)}`,
    }
}


export default async function TagPage({ params }: PageProps) {
    const tag = allDocuments.filter(isType(['Tag'])).filter(tag => tag.name.toLowerCase() === decodeURI(params.tag).toLowerCase() && FilterByLang(tag, params.lang))[0];
    if (!!!tag) notFound();

    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    const posts = allDocuments.filter(isType(['Post'])).filter(post => post.tag.map(tag => tag.toLowerCase()).includes(tag.name.toLowerCase()) && FilterByLang(post, params.lang));

    return (
        <CommonContainer lang={params.lang}
            header={`${LL.TAGS_PAGE()} - ${tag.name}`}
            contentList={posts}
        />
    );
}


export const generateStaticParams = async () => {
    const tags = allDocuments.filter(isType(['Tag']));

    return tags.map(tags => { tag: tags.name });
}

interface PageProps {
    params: {
        lang: string,
        tag: string,
    }
}