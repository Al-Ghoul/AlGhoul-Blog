import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import { CapitalizeFirstLetter, getBaseUrl, getMetaData } from '@/helpers';
import CommonContainer from '@/components/general/CommonContainer';
import { notFound } from 'next/navigation';


async function fetchTopicWithPosts(topicId: number, languageCode: string) {
  const res = await fetch(`${getBaseUrl()}/api/topics/${topicId}/posts?langCode=${languageCode}`, { next: { tags: ["topicsPosts"] } });

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json() as Promise<{ posts: PostType, topic: TopicType[0] }>;
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await fetchTopicWithPosts(parseInt(params.topicId), params.lang).catch(() => notFound());
  if (!topic) notFound();
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return {
    title: CapitalizeFirstLetter(topic.translation),
    ...getMetaData(
      {
        params: {
          title: `${LL.siteTitle()} | ${CapitalizeFirstLetter(topic.translation)}`,
          languageCode: params.lang,
          description: LL.DESCRIPTION(),
          currentPath: `/topic/${topic.topicId}`,
        }
      }
    )
  }
}


export default async function TopicPage({ params }: PageProps) {
  const { topic, posts } = await fetchTopicWithPosts(parseInt(params.topicId), params.lang).catch(() => notFound());
  if (!topic || !posts.length) notFound();
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return (
    <CommonContainer
      lang={params.lang}
      header={`${LL.TOPICS_PAGE()} - ${topic.translation}`}
      contentList={posts}
    />
  );
}



interface PageProps {
  params: {
    lang: Locales,
    topicId: string,
  }
}