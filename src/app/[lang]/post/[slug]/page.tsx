import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import Image from 'next/image'
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import "public/styles/highlight-js/androidstudio.css"
import Pre from '@/components/general/pre';
import type { PostType } from '@/helpers/db';
import { notFound } from 'next/navigation';
import { s } from 'hastscript';
import remarkToc from 'remark-toc'
import Header from '@/components/general/Header';
import { formatDate, getBaseUrl } from '@/helpers';

async function GetPostData(slug: string, languageCode: string) {
    const res = await fetch(`${getBaseUrl()}/api/post/${slug}/${languageCode}`, { next: { tags: ["postsData"] } });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json() as Promise<{ post: PostType }>;
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
                <div className="flex min-w-full justify-between mx-auto max-w-screen-lg backdrop-blur-3xl bg-black/25 text-white rounded-md">
                    <article
                        className="grid flex-auto grid-cols-[0.3fr_1fr] grid-rows-[1fr_0.05fr] hyphens-auto"
                        dir={params.lang == 'ar' ? 'rtl' : ''}
                    >
                        <header className='grid grid-rows-[0.2fr_1fr]'>
                            <div className='flex flex-col md:flex-row justify-between p-3 border-b'>
                                <Link className='flex flex-col border-b md:border-0' href={`/${params.lang}/author/${post.author.name}`}>
                                    <div className='relative h-14 w-14 md:h-20 md:w-20 self-center'>
                                        <Image
                                            className='rounded-full border-2 border-white'
                                            fill
                                            src={post!.author.profileImageURL}
                                            alt={`${post!.author.name}'s profile picture`}
                                        />
                                    </div>
                                    <p className='self-center'>{post!.author.name}</p>
                                </Link>
                                <p className='self-center break-normal px-2'>{post!.author.bio}</p>
                                <p className='mt-auto'>{`${LL.POSTED_AT()} ${formatDate(post.date.toString(), params.lang)}`}</p>
                            </div>

                            <div className='flex flex-col'>
                                <p className='mx-auto'>{LL.TAGS_PAGE()}</p>
                                <ul className='flex flex-wrap p-3'>
                                    {post!.tags.map(tag => <li className='mx-1 underline hover:text-blue-400' key={tag.id}><Link href={`/${params.lang}/tag/${tag.name}`}>{tag.name}</Link></li>)}
                                </ul>
                            </div>
                        </header>

                        <div className='border-s border-white p-5'>
                            <div className='prose prose-p:text-white'>
                                <MDXRemote
                                    source={post.content}
                                    options={{
                                        mdxOptions: {
                                            remarkPlugins: [[remarkToc, { heading: 'toc' }]],
                                            rehypePlugins: [rehypeHighlight, rehypeSlug, [rehypeAutolinkHeadings, {
                                                content(node: any) {
                                                    return [
                                                        s('svg', {
                                                            xmlns: 'http://www.w3.org/2000/svg',
                                                            fill: 'none',
                                                            viewbox: '0 0 24 24',
                                                            strokeWidth: '1.5',
                                                            stroke: 'currentColor',
                                                            className: "w-6 h-6 inline mr-1",
                                                        }, [
                                                            s('path', {
                                                                strokeLinecap: 'round',
                                                                strokeLinejoin: 'round',
                                                                d: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
                                                            })
                                                        ])
                                                    ]
                                                }
                                            }]],
                                        },
                                    }}
                                    components={
                                        {
                                            pre: Pre,
                                        }
                                    }
                                />
                            </div>
                        </div>

                        <div className='col-span-2 border-t border-white'>

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