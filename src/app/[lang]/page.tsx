
import { loadLocaleAsync } from '@/i18n/i18n-util.async'
import { i18nObject } from '@/i18n/i18n-util'
import type { Locales } from '@/i18n/i18n-types';
import Welcome from '@/components/general/Welcome';
import { allDocuments, isType } from 'contentlayer/generated'
import { FilterByLang, DateHoursDiff } from '@/helpers';


export default async function Home({ params }: PageProps) {
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);
  const posts = allDocuments.filter(isType(['Post']))
    .sort(post => new Date(post.date) > (new Date()) ? 1 : -1)
    .filter(post => FilterByLang(post, params.lang)).slice(0, 2);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Welcome styles={'p-7 mt-20'} message={LL.WELCOMING[Math.floor(Math.random() * 2) as 0 | 1]()} lanugage={params.lang} />

      <section id={'mainsection'} dir={params.lang == 'ar' ? 'rtl' : ''}>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white">{LL.MY_BLOG()}</h2>
            <p className="font-light sm:text-xl text-white">{LL.BLOG_ENTRY()}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">

            {posts.map(post => {
              const author = allDocuments.filter(isType(['Author'])).filter(author => post.author.includes(author.name))[0];
              const tags = allDocuments.filter(isType(['Tag'])).filter(tag => post.tag.includes(tag.name));
              let className = ''
              if (posts.length == 1) className = 'col-span-2';

              return (
                <article key={post._id} className={`p-6 bg-blue-900 rounded-lg border border-gray-200 shadow-md ${className}`}>
                  <div className="flex justify-between items-center mb-5 text-white">
                    <div className="flex justify-around">
                      {tags.map(tag => (
                        <a key={tag._id} href={`/${params.lang}/tag/${tag.name}`}>
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                            <svg className="mx-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d={`${tag.svgIconPath}`}>
                              </path>
                            </svg>
                            {tag.name}
                          </span>
                        </a>
                      ))}
                    </div>

                    <span className="text-sm">{LL.HOURS_AGO({ hours: DateHoursDiff(post.date) })}</span>
                  </div>

                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-white"><a href={`/${params.lang}/post/${post.title}`}>{post.title}</a></h2>
                  <p className="mb-5 font-light text-gray-200">{post.body.raw.length > 1 ? `${post.body.raw.substring(1, 500)}...` : 'No content?'}</p>

                  <div className="flex justify-between items-center mt-auto">

                    <div className="flex items-center">
                      <a className='inline-flex' href={`/${params.lang}/author/${author.name}`}>
                        <img className="w-7 h-7 rounded-full" src={`${author.profilePicture}`} alt={`${post.author}'s avatar`} />
                        <span className="font-medium text-white mx-2">
                          {author.name}
                        </span>
                      </a>
                    </div>

                    <a href={`/${params.lang}/post/${post.title}`} className="inline-flex items-center font-medium text-white hover:underline">
                      {LL.READ_MORE()}
                      <svg className="mx-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        {
                          params.lang == 'en' ?
                            <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" strokeLinecap="round" strokeLinejoin="round" />
                            :
                            <path fillRule="evenodd" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" clipRule="evenodd" />
                        }
                      </svg>
                    </a>
                  </div>
                </article>
              );
            }
            )}

          </div>
        </div>
      </section>
    </main>
  )
}

interface PageProps {
  params: { lang: string }
}