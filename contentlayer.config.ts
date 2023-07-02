import { makeSource, defineDocumentType } from '@contentlayer/source-files'

export const Author = defineDocumentType(() => ({
    name: 'Author',
    filePathPattern: `author/**/*.mdx`,
    fields: {
        name: {
            type: 'string',
            description: 'Author name',
            required: true
        },
        profilePicture: {
            type: 'string',
            description: 'Author profile picture URL',
            required: true
        },
        bio: {
            type: 'string',
            description: 'Author bio',
        }
    }
}));

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `post/**/*.mdx`,
    fields: {
        title: {
            type: 'string',
            description: 'Post title.',
            required: true
        },
        date: {
            type: 'date',
            description: 'Post publish date.',
            required: true
        },
        author: {
            type: 'list',
            of: { type: 'string' },
            description: 'Post author, could be multiple authors (collaboration)',
            required: true,
        },
        tag: {
            type: 'list',
            of: { type: 'string' },
            description: 'List of tags which indicates categories which the post belongs to.',
            required: true
        },
        published: {
            type: 'boolean',
            description: 'Indicates whether or not post is published.',
            required: true
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (post) => `${post._raw.flattenedPath}`,
        },
    }
}));

export const Tag = defineDocumentType(() => ({
    name: 'Tag',
    filePathPattern: `tag/**/*.mdx`,
    fields: {
        name: {
            type: 'string',
            description: 'Tag name.',
            required: true
        },
        icon: {
            type: 'string',
            description: 'Tag icon name.'
        },
        svgIconPath: {
            type: 'string',
            description: 'SVG type icon.'
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (tag) => `${tag._raw.flattenedPath}`,
        },
    }
}))

export const Language = defineDocumentType(() => ({
    name: 'Language',
    filePathPattern: `language/**/*.mdx`,
    fields: {
        name: {
            type: 'string',
            description: 'Tag name.',
            required: true
        },
        code: {
            type: 'string',
            description: 'Lanugage code',
            required: true
        },
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (lang) => `${lang._raw.flattenedPath}`,
        },
    }
}))

export default makeSource({
    contentDirPath: './content',
    contentDirInclude: ['tag', 'post', 'author', 'language'],
    documentTypes: [Tag, Post, Author, Language],
})






