import type { Locales } from "@/i18n/i18n-types";

export const formatDate = (date: string, languageCode: string) => {
  const inputDate = new Date(date);

  return `${
    inputDate.toLocaleDateString(languageCode, {
      weekday: "short",
      year: "2-digit",
      month: "short",
      day: "2-digit",
    })
  }`;
};

export const CapitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export function isAuthor(author: Entity): author is AuthorType {
  return (author[0] as AuthorType[0]).profileImageURL !== undefined;
}

export function isPost(post: Entity): post is PostType {
  return (post[0] as PostType[0]).published !== undefined;
}

export function isTag(tag: Entity): tag is TagType {
  return (tag[0] as TagType[0]).icon !== undefined;
}

export function isTopic(topic: Entity): topic is TopicType {
  return (topic[0] as TopicType[0]).translation !== undefined;
}

export type Entity = AuthorType | TagType | PostType | TopicType;

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

// deno-lint-ignore no-explicit-any
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    switch (res.status) {
      case 404:
        throw new Error("The requested resource was not found.");
      case 400:
        throw new Error(
          `Please check the following error: ${(await res.json()).message}`,
        );
      case 500:
        throw new Error("Server error, please try again later");
    }
  }

  return res.json();
}

export const getMetaData = ({ params }: {
  params: {
    title: string;
    languageCode?: Locales;
    description: string;
    currentPath: string;
    dropAlternates?: boolean;
  };
}) => {
  const { title, languageCode, description, currentPath, dropAlternates } =
    params;
  const alternates = dropAlternates !== true
    ? {
      languages: {
        "ar": `/ar/${currentPath}`,
        "en": `/en/${currentPath}`,
        "en-US": `/en/${currentPath}`,
      },
    }
    : {};

  return (
    {
      alternates: {
        canonical: `/${languageCode}/${currentPath}`,
        ...alternates,
      },
      openGraph: {
        title,
        type: "website",
        url: `/${languageCode}/${currentPath}`,
        description: description,
        images: [
          {
            url: `${getBaseUrl()}/opengraph-image.png`,
            width: 2048,
            height: 2048,
          },
        ],
      },
      twitter: {
        creator: "@abdo_alghoul",
        creatorId: "960225296258564096",
        description: description,
        card: "summary",
        images: [
          {
            url: `${getBaseUrl()}/twitter-image.png`,
            width: 2048,
            height: 2048,
          },
        ],
      },
    }
  );
};
