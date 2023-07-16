import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import Header from '@/components/general/Header';
import AboutMeAR from '@/components/MDXContent/AboutMe_AR.mdx';
import AboutMeEN from '@/components/MDXContent/AboutMe_EN.mdx';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: `${LL.siteTitle()} - ${LL.ABOUT_ME()}`,
    }
}

export default async function About({ params }: PageProps) {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <>
            <Header lang={params.lang} />

            <main className="flex min-h-screen p-1 md:p-24  md:px-48">
                <div className="flex flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-blue-800/70 rounded-xl p-3">
                    <h1 className='self-center text-xl md:text-3xl whitespace-nowrap text-[#f53c3c] font-aref'>{LL.siteTitle()}</h1>

                    <article className='prose max-w-max prose-p:text-white prose-headings:text-white
                             prose-a:decoration-black prose-strong:text-white prose-code:text-white
                              prose-a:text-white prose-p:font-semibold prose-a:font-semibold
                              prose-code:bg-blue-800/70 marker:text-white font-cairo'
                        dir={params.lang == 'ar' ? 'rtl' : ''}>
                        { params.lang == 'ar' ? <AboutMeAR /> : <AboutMeEN /> }
                    </article>
                </div>
                {/* <article
                    className="flex flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-blue-800/70 rounded-xl p-3"
                    dir={params.lang == 'ar' ? 'rtl' : ''}
                >
                    <h1 className='self-center text-xl md:text-3xl whitespace-nowrap text-[#f53c3c] font-aref'>{LL.siteTitle()}</h1>
                    <p className="text-white text-3xl mb-6">Welcome to my blog & portfolio!</p>
                    <h2 className='text-white text-2xl mb'>Who am I?</h2>
                    <hr></hr>
                    <div className='flex flex-col text-white font-cairo text-3xl gap-3 p-3'>
                        <p>I am a self-taught, highly motivated programmer and developer with a passion for building innovative and user-friendly software. I have been learning to code for the past 5 years, and I have a strong understanding of a variety of programming languages and technologies, including Python, JavaScript, React, and Django.</p>

                        <p>I am also a highly motivated and results-oriented individual. I am always eager to learn new things and take on new challenges. I am also a team player and I enjoy collaborating with others to achieve common goals.</p>

                        <p>I am confident that I have the skills and experience necessary to be successful in a software development role. I am a hard worker and I am always willing to go the extra mile. I am also a creative thinker and I am always looking for new ways to improve my skills and knowledge.</p>

                        <p>I am excited about the opportunity to use my skills and experience to make a positive impact on the world. I believe that software can be used to solve some of the world's most pressing problems, and I am eager to be a part of that effort.</p>

                        <p>If you are looking for a highly motivated and skilled programmer who is passionate about building innovative software, I would be honored to discuss my qualifications with you.</p>
                    </div>
                </article> */}
            </main>
        </>
    );
}
interface PageProps {
    params: {
        lang: 'ar' | 'en'
    }
}