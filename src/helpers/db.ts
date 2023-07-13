import { PrismaClient, Prisma } from '@prisma/client'
import { Langar } from 'next/font/google'

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
            tags: { every: { name: { contains: tag }, language: { code: { contains: languageCode } } } },
            language: { code: { contains: languageCode } }
        }
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

export type Languages = Prisma.PromiseReturnType<typeof GetLanguages>
export type Posts = Prisma.PromiseReturnType<typeof GetPostsByTagAndLanguage>
export type Authors = Prisma.PromiseReturnType<typeof GetAuthorsByLanguage>
export type Tags = Prisma.PromiseReturnType<typeof GetTagsByLanguage>
export type Topics = Prisma.PromiseReturnType<typeof GetTopicsByLanguage>
export type MainTopics = Prisma.PromiseReturnType<typeof GetMainTopics>
export type AuthorsWithLangs = Prisma.PromiseReturnType<typeof GetAuthorsWithLanguages>