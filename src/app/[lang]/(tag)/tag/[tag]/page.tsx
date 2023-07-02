import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import { allDocuments, isType } from 'contentlayer/generated'
import { CapitalizeFirstLetter, FilterByLang } from '@/helpers';
import { notFound } from 'next/navigation';

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
        <main className="flex min-h-screen p-24">
            <div
                className="flex flex-col w-[788px] h-[384px] mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3"
                dir={params.lang == 'ar' ? 'rtl' : ''}
            >
                <p className='text-white font-semibold text-6xl pb-3'>
                    {LL.TAGS_PAGE()} - {tag.name}
                </p>
                <hr />

                <ul className='flex flex-wrap max-w-lg text-white text-2xl'>
                    {posts.map(post => (
                        <li className='my-2 mr-5' key={post._id}>
                            <a href={`/${params.lang}/post/${post.title}`}>
                                {post.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
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