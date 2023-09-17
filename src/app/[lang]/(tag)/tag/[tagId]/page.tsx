import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import { CapitalizeFirstLetter, getBaseUrl, getMetaData } from '@/helpers';
import CommonContainer from '@/components/general/CommonContainer';
import { notFound } from 'next/navigation';


async function fetchPosts(tagId: string, languageCode: string) {
  const res = await fetch(`${getBaseUrl()}/api/tags/${tagId}/posts/?langCode=${languageCode}`, { next: { tags: ["tagsPosts"] } });

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json() as Promise<{ posts: PostType }>;
}

async function fetchTag(tagId: string) {
  const res = await fetch(`${getBaseUrl()}/api/tags/${tagId}`, { next: { tags: ["tagsPosts"] } });

  if (!res.ok) throw new Error("Failed fetch data");

  return res.json() as Promise<{ tag: TagType[0] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await fetchTag(params.tagId).catch(() => notFound());
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return {
    title: CapitalizeFirstLetter(tag.name),
    ...getMetaData(
      {
        params: {
          title: `${LL.siteTitle()} | ${CapitalizeFirstLetter(tag.name)}`,
          languageCode: params.lang,
          description: LL.DESCRIPTION(),
          currentPath: `/tag/${tag.id}`,
        }
      }
    )
  }
}

export default async function TagPage({ params }: PageProps) {
  const { posts } = await fetchPosts(params.tagId, params.lang).catch(() => notFound());
  const { tag } = await fetchTag(params.tagId).catch(() => notFound());

  if (!posts.length) notFound();
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return (
    <CommonContainer
      lang={params.lang}
      header={`${LL.TAGS_PAGE()} - ${tag.name}`}
      contentList={posts}
    />
  );
}



interface PageProps {
  params: {
    lang: Locales,
    tagId: string,
  }
}