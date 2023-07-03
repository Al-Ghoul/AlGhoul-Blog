import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import { allDocuments, isType } from 'contentlayer/generated'
import { FilterByLang } from '@/helpers';
import Link from 'next/link';
import CommonContainer from '@/components/general/CommonContainer';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: `${LL.siteTitle()} - ${LL.TAGS_PAGE()}`,
    }
}

export default async function Tags({ params }: PageProps) {
    const tags = allDocuments.filter(isType(['Tag'])).filter(tag => FilterByLang(tag, params.lang));
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <CommonContainer lang={params.lang}
            header={LL.TAGS_PAGE()}
            contentList={tags}
        />
    );
}

interface PageProps {
    params: {
        lang: string
    }
}