
import { loadLocaleAsync } from '@/i18n/i18n-util.async'
import { i18nObject } from '@/i18n/i18n-util'
import type { Locales } from '@/i18n/i18n-types';
import Welcome from '@/components/general/Welcome';
import { DateHoursDiff } from '@/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { GetTopTwoPostsByLanguageAndSortedByDate } from '@/helpers/db';
import { notFound } from 'next/navigation';
import Header from '@/components/general/Header';

export default async function Home({ params }: PageProps) {
  if (!['ar', 'en'].includes(params.lang.toLowerCase())) notFound();
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);
  const posts = await GetTopTwoPostsByLanguageAndSortedByDate(params.lang);

  return (
    <>
      <Header lang={params.lang} />

      <main className="flex min-h-screen flex-col items-center">
        <Welcome styles={'p-7 mt-20'} message={LL.WELCOMING[Math.floor(Math.random() * 2) as 0 | 1]()} lanugage={params.lang} />

        <section id='mainsection' dir={params.lang == 'ar' ? 'rtl' : ''}>
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white">{LL.MY_BLOG()}</h2>
              <p className="font-light sm:text-xl text-white">{LL.BLOG_ENTRY()}</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">

              {posts.map(post => {
                let className = ''
                if (posts.length == 1) className = 'col-span-2';

                return (
                  <article key={post.id} className={`p-6 bg-blue-900 rounded-lg border border-gray-200 shadow-md ${className}`}>
                    <div className="flex justify-between items-center mb-5 text-white">
                      <div className="flex justify-around">
                        {post.tags.map(tag => (
                          <Link key={tag.id} href={`/${params.lang}/tag/${tag.name}`}>
                            <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                              <svg className="mx-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d={`${tag.icon}`}>
                                </path>
                              </svg>
                              {tag.name}
                            </span>
                          </Link>
                        ))}
                      </div>

                      <span className="text-sm">{LL.HOURS_AGO({ hours: DateHoursDiff(post.date.toString()) })}</span>
                    </div>

                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
                      <Link href={`/${params.lang}/post/${post.title}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mb-5 font-light text-gray-200">{post.content.length > 1 ? `${post.content.substring(1, 500)}...` : 'No content?'}</p>

                    <div className="flex justify-between items-center mt-auto">

                      <div className="flex items-center">
                        <Link className='inline-flex' href={`/${params.lang}/author/${post.author.name}`}>
                          <div className='relative w-7 h-7'>

                            <Image className="rounded-full" fill src={`${post.author.profileImageURL}`} alt={`${post.author.name}'s avatar`} />
                          </div>
                          <span className="font-medium text-white mx-2">
                            {post.author.name}
                          </span>
                        </Link>
                      </div>

                      <Link href={`/${params.lang}/post/${post.title}`} className="inline-flex items-center font-medium text-white hover:underline">
                        {LL.READ_MORE()}
                        <svg className="mx-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          {
                            params.lang == 'en' ?
                              <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" strokeLinecap="round" strokeLinejoin="round" />
                              :
                              <path fillRule="evenodd" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" clipRule="evenodd" />
                          }
                        </svg>
                      </Link>
                    </div>
                  </article>
                );
              }
              )}

            </div>
          </div>
        </section>
      </main>
    </>
  )
}

interface PageProps {
  params: { lang: 'ar' | 'en' }
}