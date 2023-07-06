import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import { CapitalizeFirstLetter } from '@/helpers';
import CommonContainer from '@/components/general/CommonContainer';
import { GetPostsByTagAndLanguage, } from '@/helpers/db';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);
    const tag = decodeURI(params.tag);

    return {
        title: `${LL.siteTitle()} - ${CapitalizeFirstLetter(tag)}`,
    }
}


export default async function TagPage({ params }: PageProps) {
    const posts = await GetPostsByTagAndLanguage(decodeURI(params.tag), params.lang);
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <CommonContainer
            lang={params.lang}
            header={`${LL.TAGS_PAGE()} - ${params.tag}`}
            contentList={posts}
        />
    );
}



interface PageProps {
    params: {
        lang: string,
        tag: string,
    }
}