import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { allDocuments, isType } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { FilterByLang } from '@/helpers';
import Link from 'next/link';

export default async function AuthorPage({ params }: PageProps) {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);
    const author = allDocuments.filter(isType(['Author'])).filter(author => author.name.toLowerCase() == decodeURI(params.author).toLowerCase())[0];

    if (!!!author) notFound();

    const authorsPost = allDocuments.filter(isType(['Post'])).filter(post => post.author.includes(author.name) && FilterByLang(post, params.lang));

    return (
        <main className="flex min-h-screen p-24">
            <div
                className="flex flex-col w-[788px] h-[384px] mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3"
                dir={params.lang == 'ar' ? 'rtl' : ''}
            >
                <div className='flex justify-between'>
                    <p className='text-white font-semibold text-5xl mt-auto'>
                        {LL.AUTHOR_POSTS_PAGE({ name: author.name })}
                    </p>
                    <div className='flex text-white gap-2'>
                        <p className='mt-auto'>{author.bio}</p>
                        <Image
                            className='rounded-full'
                            width={70}
                            height={70}
                            src={author.profilePicture}
                            alt={`${author.name}'s profile picture`}
                        />
                    </div>
                </div>

                <hr />

                <ul className='flex flex-wrap max-w-lg text-white text-2xl'>
                    {authorsPost.map(post => (
                        <li className='my-2 mr-5' key={post._id}>
                            <Link href={`/${params.lang}/post/${post.title}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}


interface PageProps {
    params: {
        lang: string,
        author: string
    }
}