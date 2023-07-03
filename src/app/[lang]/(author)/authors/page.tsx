import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import { allDocuments, isType } from 'contentlayer/generated'
import { FilterByLang } from '@/helpers';
import CommonContainer from '@/components/general/CommonContainer';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: `${LL.siteTitle()} - ${LL.AUTHORS_PAGE()}`,
    }
}

export default async function Tags({ params }: PageProps) {
    const authors = allDocuments.filter(isType(['Author'])).filter(author => FilterByLang(author, params.lang));
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <CommonContainer lang={params.lang}
            header={LL.AUTHORS_PAGE()}
            contentList={authors}
        />
    );
}

interface PageProps {
    params: {
        lang: string
    }
}