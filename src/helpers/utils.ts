
import type { Tag, Post, Author } from '.contentlayer/generated';

export const FilterByLang = (entity: Entity, lang: string): boolean => entity._raw.sourceFileDir.split('/')[1] == lang

export const DateHoursDiff = (date: string): number => {
    const firstDate = new Date(date);
    const currentDate = new Date();

    return Math.floor((currentDate.getTime() - firstDate.getTime()) / (3600 * 1000));
}




export const CapitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);


export function isAuthor(author: Entity): author is Author {
    return (author as Author).profilePicture !== undefined;
}

export function isPost(post: Entity): post is Post {
    return (post as Post).published !== undefined;
}

export function isTag(tag: Entity): tag is Tag {
    return (tag as Tag).icon !== undefined;
}

type Entity = Tag | Post | Author;
