import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { allDocuments, isType } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight';
import "public/styles/highlight-js/androidstudio.css"
import Pre from '@/components/general/pre';

const PostPage = async ({ params }: PageProps) => {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);
    const post = allDocuments.filter(isType(['Post'])).filter(post => post.title.toLowerCase() === decodeURI(params.post).toLowerCase())[0];
    const author = allDocuments.filter(isType(['Author'])).filter(author => post.author.includes(author.name))[0];


    return (
        <main className="flex min-h-screen p-1 md:p-24">
            <div className="flex justify-between mx-auto max-w-screen-lg backdrop-blur-3xl bg-black/25 text-white rounded-md">
                <article
                    className="grid grid-cols-[0.3fr_1fr] grid-rows-[1fr_0.05fr] hyphens-auto"
                    dir={params.lang == 'ar' ? 'rtl' : ''}
                >
                    <header className='grid grid-rows-[0.2fr_1fr]'>
                        <div className='flex flex-col md:flex-row justify-between p-3 border-b'>
                            <Link className='flex flex-col border-b md:border-0' href={`/${params.lang}/author/${author.name}`}>
                                <div className='relative h-14 w-14 md:h-20 md:w-20 self-center'>
                                    <Image
                                        className='rounded-full border-2 border-white'
                                        fill
                                        src={author.profilePicture}
                                        alt={`${author.name}'s profile picture`}
                                    />
                                </div>
                                <p className='self-center'>{author.name}</p>
                            </Link>
                            <p className='self-center break-normal px-2'>{author.bio}</p>
                        </div>

                        <div className='flex flex-col'>
                            <p className='mx-auto'>{LL.TAGS_PAGE()}</p>
                            <ul className='flex flex-wrap p-3'>
                                {post.tag.map(tag => <li className='mx-1 underline hover:text-blue-400' key={tag}><Link href={`/${params.lang}/tag/${tag}`}>{tag}</Link></li>)}
                            </ul>
                        </div>
                    </header>

                    <div className='border-s border-white p-5'>
                        <div className='prose prose-p:text-white'>
                            <MDXRemote
                                source={post.body.raw}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [],
                                        rehypePlugins: [rehypeHighlight],
                                    }
                                }}
                                components={
                                    {
                                        pre: Pre
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
    );
}

export default PostPage;

interface PageProps {
    params: {
        lang: string,
        post: string,
    }
}