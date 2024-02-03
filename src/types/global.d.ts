import {
  getAuthors,
  getLanguages,
  getMainTopics,
  getPosts,
  getTags,
  getTopics,
} from "@/helpers/db";
import { Prisma } from "@prisma/client";

type PostType = Prisma.PromiseReturnType<typeof getPosts>;
type AuthorType = Prisma.PromiseReturnType<typeof getAuthors>;
type TagType = Prisma.PromiseReturnType<typeof getTags>;
type TopicType = Prisma.PromiseReturnType<typeof getTopics>;
type LanguageType = Prisma.PromiseReturnType<typeof getLanguages>;
type MainTopicsType = Prisma.PromiseReturnType<typeof getMainTopics>;

type PostWithAuthorAndTags = Prisma.PostGetPayload<
  typeof postsWithAuthorAndTags
>;
type PostWithTags = Prisma.PostGetPayload<typeof postsWithTags>;
type TopicWithLanguage = Prisma.Topic_Language_TranslationGetPayload<
  typeof topicWithLanguage
>;
type AuthorWithLanguage = Prisma.AuthorGetPayload<typeof authorWithLanguages>;
type TagWithLanguage = Prisma.TagGetPayload<typeof tagWithLanguage>;

type searchParamsType = {
  languageCode?: string;
  published?: boolean;
  count: number | null;
  orderByKey: string | null;
  sortBy: string | null;
  include?: Array<string>;
};

const postsWithAuthorAndTags = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { tags: true, author: true },
});

const postsWithTags = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { tags: true },
});

const topicWithLanguage = Prisma.validator<
  Prisma.Topic_Language_TranslationArgs
>()({
  include: { language: true },
});

const authorWithLanguages = Prisma.validator<Prisma.AuthorArgs>()({
  include: { language: true },
});

const tagWithLanguage = Prisma.validator<Prisma.TagArgs>()({
  include: { language: true },
});

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  imageURL: string;
};
