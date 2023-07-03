
'use client';
import { isAuthor, isPost, isTag } from "@/helpers";
import { allDocuments, isType, type Author, type Post, type Tag } from "contentlayer/generated";
import Link from "next/link";
import Image from 'next/image'


const CommonContainer = ({ lang, header, contentList, author }: Props) => {
    return (
        <main className="flex min-h-screen p-1 md:p-24">
            <div
                className="flex flex-col w-[788px] mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3"
                dir={lang == 'ar' ? 'rtl' : ''}
            >
                <div className='flex justify-between'>
                    <p className='text-white font-semibold text-5xl mt-auto'>
                        {header}
                    </p>
                    {author !== undefined &&
                        <div className='flex text-white gap-2'>
                            <p className='mt-auto'>{author.bio}</p>
                            <Image
                                className='rounded-full'
                                width={70}
                                height={70}
                                src={author.profilePicture}
                                alt={`${author.name}'s profile picture`}
                            />
                        </div>}
                </div>

                <hr />

                <ul className='flex flex-wrap max-w-lg text-white text-2xl'>
                    {contentList.map(item => {
                        if (isTag(item)) {
                            const allPosts = allDocuments.filter(isType(['Post']));
                            const tagCount = allPosts.filter(post => post.tag.includes(item.name)).length;

                            return (
                                <li className='my-2 mr-5' key={item._id}>
                                    <Link href={`/${lang}/tag/${item.name}`}>
                                        {item.name} : ({tagCount})
                                    </Link>
                                </li>
                            );
                        }

                        else if (isAuthor(item)) {
                            const allPosts = allDocuments.filter(isType(['Post']));
                            const authorsCount = allPosts.filter(post => post.author.includes(item.name)).length;

                            return (
                                <li className='my-2 mr-5' key={item._id}>
                                    <Link href={`/${lang}/author/${item.name}`}>
                                        {item.name} : ({authorsCount})
                                    </Link>
                                </li>
                            );
                        }
                        else if (isPost(item)) {
                            return (
                                <li className='my-2 mr-5' key={item._id}>
                                    <Link href={`/${lang}/post/${item.title}`}>
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </main>
    );
}

export default CommonContainer;

interface Props {
    lang: string,
    header: string,
    contentList: Array<Author | Tag | Post>
    author?: Author
}