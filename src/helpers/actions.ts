"use server"
import { prisma } from "./db";
import type { TagInputType, AuthorInputType, TopicInputType, TopicTranslationInputType, PostInputType } from "./form-validators";
import { AuthorInputSchema, PostInputSchema, TagInputSchema, TopicInputSchema, TopicTranslationInputSchema } from "./form-validators";
import { revalidateTag } from 'next/cache'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function IsAdminUser() {
    const session = await getServerSession(authOptions);
    if (!session?.user.is_admin) throw Error("UnAuthorized");
}

export const createAuthor = async (input: AuthorInputType, userId: string) => {
    IsAdminUser()
        .then(async () => {
            AuthorInputSchema.parse(input);

            const createdAuthor = await prisma.author.create({ data: { ...input, userId } });
            if (!createdAuthor) throw Error("Error occurred creating author");
            revalidateTag("authors");
        }).catch(e => { throw Error(e) });
};

export const createTag = async (input: TagInputType) => {
    IsAdminUser()
        .then(async () => {
            TagInputSchema.parse(input);

            const createdTag = await prisma.tag.create({ data: { ...input } });
            if (!createdTag) throw Error("Error occurred creating tag");
            revalidateTag("tags");
        }).catch(e => { throw Error(e) });
}

export const createTopic = async (input: TopicInputType) => {
    IsAdminUser()
        .then(async () => {
            TopicInputSchema.parse(input);

            const createdTopic = await prisma.topic.create({ data: { ...input } });
            if (!createdTopic) throw Error("Error occurred creating topic");
            revalidateTag("topics");
        })
        .catch(e => { throw Error(e) });

}

export const createTopicTranslation = async (input: TopicTranslationInputType) => {
    IsAdminUser()
        .then(async () => {
            TopicTranslationInputSchema.parse(input);

            const createdTopicTranslation = await prisma.topic_Language_Translation.create({ data: { ...input } });
            if (!createdTopicTranslation) throw Error("Error occurred creating topic translation");
            revalidateTag("topics");
        }).catch(e => { throw Error(e) });
}

export const createPost = async (input: PostInputType, tagList: Array<number>) => {
    IsAdminUser()
        .then(async () => {
            PostInputSchema.parse(input);

            const tagsToConnect = tagList.map(tagId => ({ id: tagId }));

            const createdPost = await prisma.post.create({ data: { ...input, tags: { connect: tagsToConnect } } });
            if (!createdPost) throw Error("Error occurred creating post");
            revalidateTag("postsData");
        })
        .catch(e => { throw Error(e) });

}

export const editPost = async (input: PostInputType, tagList: Array<number>, postId: number) => {
    IsAdminUser()
        .then(async () => {
            PostInputSchema.parse(input)

            const tagsToConnect = tagList.map(tagId => ({ id: tagId }));

            await prisma.post.update({ where: { id: postId }, data: { ...input, tags: { set: tagsToConnect } } });
            revalidateTag("postsData");
        })
        .catch(e => { throw Error(e) });

}

export const editAuthor = async (input: AuthorInputType, authorId: number) => {
    IsAdminUser()
        .then(async () => {
            AuthorInputSchema.parse(input)

            await prisma.author.update({ where: { id: authorId }, data: { ...input } });
            revalidateTag("authors");
        })
        .catch(e => { throw Error(e) });
}

export const editTopic = async (input: TopicInputType, topicId: number) => {
    IsAdminUser()
        .then(async () => {
            TopicInputSchema.parse(input)

            await prisma.topic.update({ where: { id: topicId }, data: { ...input } });
            revalidateTag("topics");
        })
        .catch(e => { throw Error(e) });
}

export const editTag = async (input: TagInputType, tagId: number) => {
    IsAdminUser()
        .then(async () => {
            TagInputSchema.parse(input)

            await prisma.tag.update({ where: { id: tagId }, data: { ...input } });
            revalidateTag("tags");
        })
        .catch(e => { throw Error(e) });
}

export const editTopicTranslation = async (translation: string, topicId: number, languageId: number) => {
    IsAdminUser()
        .then(async () => {
            await prisma.topic_Language_Translation.update({
                where: {
                    topicId_languageId: { topicId, languageId }
                },
                data: { translation }
            }
            );
            revalidateTag("topics");
        }
        )
        .catch(e => { throw Error(e) });
}

export const revalidateTagAction = async (tag: string) => {
    IsAdminUser()
        .then(() => {
            revalidateTag(tag);
        })
        .catch(e => { throw Error(e) });
}