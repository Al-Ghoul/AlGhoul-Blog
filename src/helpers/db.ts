import { PrismaClient, Prisma } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function GetTopTwoPostsByLanguageAndSortedByDate(languageCode: string) {
    return await prisma.post.findMany({
        where: { language: { code: { contains: languageCode } }, published: true },
        include: { author: true, tags: true },
        orderBy: { date: 'desc' },
        take: 2,
    });
}

export async function GetAuthorsByLanguage(languageCode: string) {
    return await prisma.author.findMany({
        where: { language: { code: { contains: languageCode } } },
    })
}

export async function GetTagsByLanguage(languageCode: string) {
    return await prisma.tag.findMany({
        where: { language: { code: { contains: languageCode } } }
    });
}


export async function GetPostsByTagAndLanguage(tag: string, languageCode: string) {
    return await prisma.post.findMany({
        where: {
            tags: { some: { name: tag, language: { code: languageCode } } },
            language: { code: languageCode }
        },
    });
}

export async function GetPostsByAuthorAndLanguage(authorName: string, languageCode: string) {
    return await prisma.post.findMany({
        where: {
            author: { name: { contains: authorName } },
            language: { code: { contains: languageCode } }
        }
    })
}

export async function GetAuthorByName(authorName: string) {
    return await prisma.author.findFirst({ where: { name: { contains: authorName } } });
}

export async function GetPostByTitleAndLanguage(postTitle: string, languageCode: string) {
    return await prisma.post.findFirst({
        where: {
            title: { contains: postTitle, },
            language: { code: { contains: languageCode } },
        },
        include: { author: true, tags: true }
    });
}

export async function GetTopicsByLanguage(languageCode: string) {
    return await prisma.topic_Language_Translation.findMany({
        where: { language: { code: languageCode } }
    });
}

export async function GetPostsByTopicIdAndLanguage(topicId: number, languageCode: string) {
    return await prisma.post.findMany({
        where: { topicId: topicId, language: { code: languageCode } }
    })
}

export async function GetTopicByIdAndLanguage(topicId: number, languageCode: string) {
    return await prisma.topic_Language_Translation.findFirst({
        where: { topicId: topicId, language: { code: languageCode } }
    });
}

export async function GetLanguages() {
    return await prisma.language.findMany();
}

export async function GetMainTopics() {
    return await prisma.topic.findMany();
}

export async function GetAuthorsWithLanguages() {
    return await prisma.author.findMany({
        include: { language: true }
    });
}
export async function GetTags() {
    return await prisma.tag.findMany({ include: { language: true } });
}

export async function GetPostWithFullData(id: number) {
    const post = await prisma.post.findFirst({
        where: { id: id },
        include: { tags: true, }
    });
    if (!post) throw Error("Couldn't find post");
    const languages = await GetLanguages();
    const topics = await GetMainTopics();
    const tags = await GetTags();
    const authors = await GetAuthorsWithLanguages();

    return { post, languages, topics, tags, authors };
}

export async function GetAuthorById(authorId: number) {
    const author = await prisma.author.findFirst({ where: { id: authorId } });
    if (!author) throw Error("Couldn't find author");

    const languages = await GetLanguages();

    return { author, languages };
}

export async function GetTagById(tagId: number) {
    const tag = await prisma.tag.findFirst({ where: { id: tagId } });
    if (!tag) throw Error("Couldn't find tag");

    const languages = await GetLanguages();

    return { tag, languages };
}

export async function GetTopicTranslationByIdAndLanguage(topicId: number, languageId: number) {
    const topicTranslation = await prisma.topic_Language_Translation.findFirst({ where: { topicId, languageId }, include: { language: true } });
    if (!topicTranslation) throw Error("Couldn't find topic translation");

    const topics = await GetMainTopics();

    return { topicTranslation, topics };
}

export async function SearchPosts(searchQuery: string) {
    return await prisma.post.findMany({ where: { content: { search: searchQuery } } });
}

export type Languages = Prisma.PromiseReturnType<typeof GetLanguages>
export type Posts = Prisma.PromiseReturnType<typeof GetPostsByTagAndLanguage>
export type Authors = Prisma.PromiseReturnType<typeof GetAuthorsByLanguage>
export type Tags = Prisma.PromiseReturnType<typeof GetTagsByLanguage>
export type Topics = Prisma.PromiseReturnType<typeof GetTopicsByLanguage>
export type MainTopics = Prisma.PromiseReturnType<typeof GetMainTopics>
export type AuthorsWithLangs = Prisma.PromiseReturnType<typeof GetAuthorsWithLanguages>

export type PostWithFullDataType = Prisma.PromiseReturnType<typeof GetPostWithFullData>

export type AuthorsPostsType = Prisma.PromiseReturnType<typeof GetPostsByAuthorAndLanguage>
export type PostType = Prisma.PromiseReturnType<typeof GetPostByTitleAndLanguage>
export type TopTwoPostsType = Prisma.PromiseReturnType<typeof GetTopTwoPostsByLanguageAndSortedByDate>
export type AuthorDataType = Prisma.PromiseReturnType<typeof GetAuthorById>

export type TagDataType = Prisma.PromiseReturnType<typeof GetTagById>
export type TopicTranslationType = Prisma.PromiseReturnType<typeof GetTopicTranslationByIdAndLanguage>
export type TagsType = Prisma.PromiseReturnType<typeof GetTags>

export type SearchPostsType = Prisma.PromiseReturnType<typeof SearchPosts>

