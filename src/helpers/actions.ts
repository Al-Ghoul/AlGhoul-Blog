"use server";
import prisma from "./client";
import type {
  AuthorInputType,
  PostInputType,
  TagInputType,
  TopicInputType,
  TopicTranslationInputType,
} from "./form-validators";
import {
  AuthorInputSchema,
  PostInputSchema,
  TagInputSchema,
  TopicInputSchema,
  TopicTranslationInputSchema,
} from "./form-validators";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from ".";
import { Locales } from "@/i18n/i18n-types";
import { cookies } from "next/headers";

async function IsAdminUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user.is_admin) throw Error("UnAuthorized");
}

export const createAuthor = async (input: AuthorInputType, userId: string) => {
  await IsAdminUser();

  AuthorInputSchema.parse(input);
  const createdAuthor = await prisma.author.create({
    data: { ...input, userId },
  });
  if (!createdAuthor) throw Error("Error occurred creating author");
  revalidateTag("authors");
};

export const createTag = async (input: TagInputType) => {
  await IsAdminUser();

  TagInputSchema.parse(input);

  const createdTag = await prisma.tag.create({ data: { ...input } });
  if (!createdTag) throw Error("Error occurred creating tag");
  revalidateTag("tags");
};

export const createTopic = async (input: TopicInputType) => {
  await IsAdminUser();

  TopicInputSchema.parse(input);

  const createdTopic = await prisma.topic.create({ data: { ...input } });
  if (!createdTopic) throw Error("Error occurred creating topic");
  revalidateTag("maintopics");
};

export const createTopicTranslation = async (
  input: TopicTranslationInputType,
) => {
  await IsAdminUser();

  TopicTranslationInputSchema.parse(input);

  const createdTopicTranslation = await prisma.topic_Language_Translation
    .create({ data: { ...input } });
  if (!createdTopicTranslation) {
    throw Error("Error occurred creating topic translation");
  }
  revalidateTag("topics");
};
export const createPost = async (
  input: PostInputType,
  tagList: Array<number>,
) => {
  PostInputSchema.parse(input);

  const tagsToConnect = tagList.map((tagId) => ({ id: tagId }));

  const createdPost = await prisma.post.create({
    data: { ...input, tags: { connect: tagsToConnect } },
  });
  if (!createdPost) throw Error("Error occurred creating post");
  revalidateTag("postsData");
};

export const editPost = async (
  input: PostInputType,
  tagList: Array<number>,
  postId: number,
) => {
  PostInputSchema.parse(input);

  const tagsToConnect = tagList.map((tagId) => ({ id: tagId }));

  await prisma.post.update({
    where: { id: postId },
    data: { ...input, tags: { set: tagsToConnect } },
  });
  revalidateTag("postsData");
};

export const editAuthor = async (
  input: AuthorInputType,
  authorName: string,
) => {
  await IsAdminUser();

  AuthorInputSchema.parse(input);

  await prisma.author.update({
    where: { name: authorName },
    data: { ...input },
  });
  revalidateTag("authors");
};

export const editTopic = async (input: TopicInputType, topicId: number) => {
  TopicInputSchema.parse(input);

  await prisma.topic.update({ where: { id: topicId }, data: { ...input } });
  revalidateTag("topics");
};

export const editTag = async (input: TagInputType, tagId: number) => {
  TagInputSchema.parse(input);

  await prisma.tag.update({ where: { id: tagId }, data: { ...input } });
  revalidateTag("tags");
};

export const editTopicTranslation = async (
  translation: string,
  topicId: number,
  languageId: number,
) => {
  await IsAdminUser();

  await prisma.topic_Language_Translation.update({
    where: {
      topicId_languageId: { topicId, languageId },
    },
    data: { translation },
  });
  revalidateTag("topics");
};

export const revalidateTagAction = async (tag: string) => {
  await IsAdminUser();
  revalidateTag(tag);
};

export const setLocale = (locale: Locales) => {
  const cookieStore = cookies();
  cookieStore.set("locale", locale, { secure: true });
};
