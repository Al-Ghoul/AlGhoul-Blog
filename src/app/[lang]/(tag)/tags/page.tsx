import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import { allDocuments, isType } from 'contentlayer/generated'
import { FilterByLang } from '@/helpers';
import Link from 'next/link';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: `${LL.siteTitle()} - ${LL.TAGS_PAGE()}`,
    }
}

export default async function Tags({ params }: PageProps) {
    const allPosts = allDocuments.filter(isType(['Post']));
    const tags = allDocuments.filter(isType(['Tag'])).filter(tag => FilterByLang(tag, params.lang));
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <main className="flex min-h-screen p-24">
            <div
                className="flex flex-col w-[788px] h-[384px] mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3"
                dir={params.lang == 'ar' ? 'rtl' : ''}
            >
                <p className='text-white font-semibold text-6xl pb-3'>
                    {LL.TAGS_PAGE()}
                </p>
                <hr />
                <ul className='flex flex-wrap max-w-lg text-white text-2xl'>
                    {tags.map(tag => {
                        const tagCount = allPosts.filter(post => post.tag.includes(tag.name)).length;
                        return (
                            <li className='my-2 mr-5' key={tag._id}>
                                <Link href={`/${params.lang}/tag/${tag.name}`}>
                                    {tag.name} : ({tagCount})
                                </Link>
                            </li>
                        );
                    }
                    )}
                </ul>
            </div>
        </main>
    );
}

interface PageProps {
    params: {
        lang: string
    }
}