

import type { Locales } from "@/i18n/i18n-types";
import type { Authors, Posts, Tags, Topics } from "./db";
import type { LocalizedString } from "typesafe-i18n";

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


export const getMetaData = ({ params }:
    {
        params: {
            title: string,
            languageCode?: Locales,
            description: string,
            currentPath: string,
            dropAlternates?: boolean
        }
    }
) => {

    const { title, languageCode, description, currentPath, dropAlternates } = params;
    const alternates = (dropAlternates !== true ? {
        languages: {
            'ar': `/ar/${currentPath}`,
            'en': `/en/${currentPath}`,
            'en-US': `/en/${currentPath}`,
        },
    } : {});

    return (
        {
            alternates: {
                canonical: `/${languageCode}/${currentPath}`,
                ...alternates
            },
            openGraph: {
                title,
                type: 'website',
                url: `/${languageCode}/${currentPath}`,
                description: description,
                images: [
                    {
                        url: `${getBaseUrl()}/opengraph-image.png`,
                        width: 2048,
                        height: 2048,
                    },
                ],
            },
            twitter: {
                creator: '@abdo_alghoul',
                creatorId: '960225296258564096',
                description: description,
                card: "summary",
                images: [
                    {
                        url: `${getBaseUrl()}/twitter-image.png`,
                        width: 2048,
                        height: 2048,
                    },
                ]
            }
        }
    );
}
