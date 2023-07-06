

import type { Authors, Posts, Tags } from "./db";

export const DateHoursDiff = (date: string): number => {
    const firstDate = new Date(date);
    const currentDate = new Date();

    return Math.floor((currentDate.getTime() - firstDate.getTime()) / (3600 * 1000));
}


export const CapitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);


export function isAuthor(author: Entity): author is Authors {
    return (author[0] as Authors[0]).profileImageURL !== undefined;
}

export function isPost(post: Entity): post is Posts {
    return (post[0] as Posts[0]).published !== undefined;
}

export function isTag(tag: Entity): tag is Tags {
    return (tag[0] as Tags[0]).icon !== undefined;
}

export type Entity = Authors | Tags | Posts;
