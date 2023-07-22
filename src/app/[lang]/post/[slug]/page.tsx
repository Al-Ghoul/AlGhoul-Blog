import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import Image from 'next/image'
import Link from 'next/link';
import type { PostType } from '@/helpers/db';
import { notFound } from 'next/navigation';
import Header from '@/components/general/Header';
import { formatDate, getBaseUrl, getMetaData } from '@/helpers';
import MDXRenderer from '@/components/general/MDXRenderer';
import type { Metadata } from 'next'

async function GetPostData(slug: string, languageCode: string) {
    const res = await fetch(`${getBaseUrl()}/api/post/${slug}/${languageCode}`, { next: { tags: ["postsData"] } });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json() as Promise<{ post: PostType }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { post } = await GetPostData(decodeURI(params.slug), params.lang).catch(() => notFound());
    if (!post) notFound();
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);
    const { openGraph, twitter, alternates } = getMetaData(
        {
            params: {
                title: `${LL.siteTitle()} | ${post.title}`,
                languageCode: params.lang,
                description: post.description,
                currentPath: `/post/${post.title}`,
                dropAlternates: true
            }
        }
    );
    return {
        title: post.title,
        description: post.description,
        authors: { name: post.author.name, url: new URL(`${getBaseUrl()}/${params.lang}/author/${post.author.name}`) },
        keywords: post.tags.map(tag => tag.name),
        alternates: {
            ...alternates
        },
        openGraph: {
            ...openGraph,
            type: 'article',
            locale: params.lang,
            tags: post.tags.map(tag => tag.name),
            publishedTime: post.date.toString(),
            authors: post.author.name,
        },
        twitter: {
            ...twitter,
        }
    }
}

const PostPage = async ({ params }: PageProps) => {
    const { post } = await GetPostData(decodeURI(params.slug), params.lang).catch(() => notFound());
    if (!post) notFound();
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <>
            <Header lang={params.lang} />
            <main className="flex min-h-screen p-1 md:p-24 md:px-48">
                <div className="flex min-w-full justify-between mx-auto max-w-screen-lg backdrop-blur-3xl bg-blue-800/70 text-white rounded-md">
                    <article
                        className="grid flex-auto grid-cols-[0.3fr_1fr] grid-rows-[1fr] hyphens-auto"
                        dir={params.lang == 'ar' ? 'rtl' : ''}
                    >
                        <header className='flex flex-col'>
                            <div className='flex flex-col justify-between p-3 border-b'>
                                <Link className='flex flex-col border-b md:border-0' href={`/${params.lang}/author/${post.author.name}`}>
                                    <div className='relative h-14 w-14 md:h-20 md:w-20 self-center'>
                                        <Image
                                            className='rounded-full border-2 border-white'
                                            fill
                                            src={post.author.profileImageURL}
                                            alt={`${post.author.name}'s profile picture`}
                                        />
                                    </div>
                                    <p className='self-center'>{post.author.name}</p>
                                </Link>
                                <p className='mt-2'>{`${LL.POSTED_AT()} ${formatDate(post.date.toString(), params.lang)}`}</p>
                            </div>

                            <div className='flex flex-col'>
                                <p className='mx-auto'>{LL.TAGS_PAGE()}</p>
                                <ul className='flex flex-wrap md:p-3'>
                                    {post.tags.map(tag => <li className='mx-1 underline hover:text-blue-400' key={tag.id}><Link href={`/${params.lang}/tag/${tag.name}`}>{tag.name}</Link></li>)}
                                </ul>
                            </div>
                        </header>

                        <div className='border-s border-white p-5'>
                            <MDXRenderer content={post.content} languageCode={params.lang} />
                        </div>

                        <div className='col-span-2 border-t border-white mb-8'>

                        </div>
                    </article>
                </div>
            </main>
        </>
    );
}

export default PostPage;

interface PageProps {
    params: {
        lang: 'ar' | 'en',
        slug: string,
    }
}