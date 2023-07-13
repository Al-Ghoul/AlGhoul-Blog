"use server"
import { prisma } from "./db";
import type { TagInputType, AuthorInputType, TopicInputType, TopicTranslationInputType, PostInputType } from "./form-validators";
import { AuthorInputSchema, PostInputSchema, TagInputSchema, TopicInputSchema, TopicTranslationInputSchema } from "./form-validators";

export const createAuthor = async (input: AuthorInputType) => {
    AuthorInputSchema.parse(input);

    const createdAuthor = await prisma.author.create({ data: { ...input } });
    if (!createdAuthor) throw Error("Error occurred creating author");
};

export const createTag = async (input: TagInputType) => {
    TagInputSchema.parse(input);

    const createdTag = await prisma.tag.create({ data: { ...input } });
    if (!createdTag) throw Error("Error occurred creating tag");
}

export const createTopic = async (input: TopicInputType) => {
    TopicInputSchema.parse(input);

    const createdTopic = await prisma.topic.create({ data: { ...input } });
    if (!createdTopic) throw Error("Error occurred creating topic");
}

export const createTopicTranslation = async (input: TopicTranslationInputType) => {
    TopicTranslationInputSchema.parse(input);

    const createdTopicTranslation = await prisma.topic_Language_Translation.create({ data: { ...input } });
    if (!createdTopicTranslation) throw Error("Error occurred creating topic translation");
}

export const createPost = async (input: PostInputType) => {
    PostInputSchema.parse(input)

    const createdPost = await prisma.post.create({ data: { ...input } });
    if (!createdPost) throw Error("Error occurred creating post");
}