
import { loadLocaleAsync } from '@/i18n/i18n-util.async'
import { i18nObject } from '@/i18n/i18n-util'
import type { Locales } from '@/i18n/i18n-types';
import { type Metadata } from 'next/types';
import Welcome from './components/general/Welcome';

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return {
    title: LL.siteTitle(),
  }
}

export default async function Home({ params }: PageProps) {
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Welcome styles={'p-7 mt-20'} message={LL.WELCOMING[Math.floor(Math.random() * 2) as 0 | 1]()} lanugage={params.lang} />

      <section id={'mainsection'}>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white">{LL.MY_BLOG()}</h2>
            <p dir={params.lang == 'ar' ? 'rtl' : ''}
              className="font-light sm:text-xl text-white">{LL.BLOG_ENTRY()}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 flex-[0_0_100%] ">
            <article className="p-6 bg-blue-900 rounded-lg border border-gray-200 shadow-md">
              <div className="flex justify-between items-center mb-5 text-white">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                  <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z">
                    </path>
                  </svg>
                  Tutorial
                </span>
                <span className="text-sm">14 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white"><a href="#">How to quickly deploy a static website</a></h2>
              <p className="mb-5 font-light text-gray-200 dark:text-gray-400">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img className="w-7 h-7 rounded-full" src="https://avatars.githubusercontent.com/u/29547307?v=4" alt="AlGhoul's avatar" />
                  <span className="font-medium text-white dark:text-white">
                    AlGhoul
                  </span>
                </div>
                <a href="#" className="inline-flex items-center font-medium text-white hover:underline">
                  Read more
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
              </div>
            </article>
            <article className="p-6 bg-blue-900 rounded-lg border border-gray-200 shadow-md">
              <div className="flex justify-between items-center mb-5 text-white">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                  <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                  Article
                </span>
                <span className="text-sm">14 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white"><a href="#">Our first project with React</a></h2>
              <p className="mb-5 font-light text-white ">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img className="w-7 h-7 rounded-full" src="https://avatars.githubusercontent.com/u/29547307?v=4" alt="AlGhoul's avatar" />
                  <span className="font-medium text-white">
                    AlGhoul
                  </span>
                </div>
                <a href="#" className="inline-flex items-center font-medium text-white hover:underline">
                  Read more
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

interface PageProps {
  params: { lang: string }
}