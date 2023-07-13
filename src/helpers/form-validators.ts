import { z } from "zod";


export const AuthorInputSchema = z.object({
    name: z.string().superRefine((val, ctx) => {
        if (!val)
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please provide an author name",
            });
    }),
    profileImageURL: z.string().url().superRefine((val, ctx) => {
        if (!val)
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please provide a profile image url",
            });
    }),
    bio: z.string().superRefine((val, ctx) => {
        if (!val)
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please provide a bio",
            });
    }),
    languageId: z.number(),
    userId: z.string(),
});

export const TagInputSchema = z.object({
    name: z.string().superRefine((val, ctx) => {
        if (!val)
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please provide a tag name.",
            });
    }),
    icon: z.string().superRefine((val, ctx) => {
        if (!val)
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please provide an svg path for the icon.",
            });
    }),
    languageId: z.number(),
});


export const TopicInputSchema = z.object({
    tag: z.string(),
});

export const TopicTranslationInputSchema = z.object({
    translation: z.string(),
    languageId: z.number(),
    topicId: z.number(),
});

export const PostInputSchema = z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.number(),
    languageId: z.number(),
    topicId: z.number(),
    published: z.boolean()
});

export type AuthorInputType = z.infer<typeof AuthorInputSchema>;
export type TagInputType = z.infer<typeof TagInputSchema>;
export type TopicInputType = z.infer<typeof TopicInputSchema>;
export type TopicTranslationInputType = z.infer<typeof TopicTranslationInputSchema>;
export type PostInputType = z.infer<typeof PostInputSchema>;