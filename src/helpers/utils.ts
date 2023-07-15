

import type { Authors, Posts, Tags, Topics } from "./db";

export const formatDate = (date: string, languageCode: string) => {
    const inputDate = new Date(date);


    return `${inputDate.toLocaleDateString(languageCode, {
        weekday: 'short', year: '2-digit', month: 'short', day: '2-digit'
    })}`
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

export function isTopic(topic: Entity): topic is Topics {
    return (topic[0] as Topics[0]).translation !== undefined;
}

export type Entity = Authors | Tags | Posts | Topics;


export const getBaseUrl = () => {
    if (typeof window !== "undefined") return ""; // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const fetcher = (key: string) => fetch(key).then(res => res.json())
