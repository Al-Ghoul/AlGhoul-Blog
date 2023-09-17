import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


export async function getPosts({ queryParams }:
  {
    queryParams: searchParamsType
  }) {
  const { languageCode, published, count, orderByKey, sortBy, include } = queryParams;

  let queryString = {}
  if (count && Number.isNaN(parseInt(count)) === false) {
    queryString = { ...queryString, take: parseInt(count) };
  }

  if (orderByKey && sortBy.length) {
    queryString = { ...queryString, orderBy: { [orderByKey]: sortBy } };
  }

  if (include?.length) {
    const inclusionQueryString = {} as { [key: string]: any };
    for (const inclusionStr of include) {
      inclusionQueryString[inclusionStr] = true;
    }
    queryString = { ...queryString, include: inclusionQueryString };
  }

  return await prisma.post.findMany({
    where: { language: { code: { equals: languageCode } }, published: published },
    ...queryString,
  });
}

export async function getAuthors({ queryParams }:
  {
    queryParams: searchParamsType
  }) {
  const { languageCode, count, orderByKey, sortBy, include } = queryParams;

  let queryString = {}
  if (count && Number.isNaN(parseInt(count)) === false) {
    queryString = { ...queryString, take: parseInt(count) };
  }

  if (orderByKey && sortBy.length) {
    queryString = { ...queryString, orderBy: { [orderByKey]: sortBy } };
  }

  if (include?.length) {
    const inclusionQueryString = {} as { [key: string]: any };
    for (const inclusionStr of include) {
      inclusionQueryString[inclusionStr] = true;
    }
    queryString = { ...queryString, include: inclusionQueryString };
  }


  if (languageCode) {
    queryString = { ...queryString, where: { language: { code: { contains: languageCode } } } };
  }

  return await prisma.author.findMany({
    ...queryString,
  })
}

export async function getTags({ queryParams }:
  {
    queryParams: searchParamsType
  }) {
  const { languageCode, count, orderByKey, sortBy, include } = queryParams;

  let queryString = {}
  if (count && Number.isNaN(parseInt(count)) === false) {
    queryString = { ...queryString, take: parseInt(count) };
  }

  if (orderByKey && sortBy.length) {
    queryString = { ...queryString, orderBy: { [orderByKey]: sortBy } };
  }

  if (include?.length) {
    const inclusionQueryString = {} as { [key: string]: any };
    for (const inclusionStr of include) {
      inclusionQueryString[inclusionStr] = true;
    }
    queryString = { ...queryString, include: inclusionQueryString };
  }

  if (languageCode) {
    queryString = { ...queryString, where: { language: { code: { contains: languageCode } } } };
  }

  return await prisma.tag.findMany({
    ...queryString
  })
}

export async function getTopics({ queryParams }:
  {
    queryParams: searchParamsType
  }) {
  const { languageCode, count, orderByKey, sortBy, include } = queryParams;

  let queryString = {}
  if (count && Number.isNaN(parseInt(count)) === false) {
    queryString = { ...queryString, take: parseInt(count) };
  }

  if (orderByKey && sortBy.length) {
    queryString = { ...queryString, orderBy: { [orderByKey]: sortBy } };
  }

  if (include?.length) {
    const inclusionQueryString = {} as { [key: string]: any };
    for (const inclusionStr of include) {
      inclusionQueryString[inclusionStr] = true;
    }
    queryString = { ...queryString, include: inclusionQueryString };
  }

  return await prisma.topic_Language_Translation.findMany({
    where: { language: { code: { contains: languageCode } } },
    ...queryString
  })
}

export async function getLanguages({ queryParams }:
  {
    queryParams: searchParamsType
  }) {
  const { languageCode, count, orderByKey, sortBy, include } = queryParams;

  let queryString = {}
  if (count && Number.isNaN(parseInt(count)) === false) {
    queryString = { ...queryString, take: parseInt(count) };
  }

  if (orderByKey && sortBy.length) {
    queryString = { ...queryString, orderBy: { [orderByKey]: sortBy } };
  }

  if (include?.length) {
    const inclusionQueryString = {} as { [key: string]: any };
    for (const inclusionStr of include) {
      inclusionQueryString[inclusionStr] = true;
    }
    queryString = { ...queryString, include: inclusionQueryString };
  }

  if (languageCode) {
    queryString = { ...queryString, where: { code: { contains: languageCode } } };
  }

  return await prisma.language.findMany({
    ...queryString
  })
}


export async function getMainTopics() {
  return await prisma.topic.findMany();
}