import { GetPostsByTopicIdAndLanguage, GetTopicByIdAndLanguage } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteParams) {
    const topicId = parseInt(params.topicId);
    const topic = await GetTopicByIdAndLanguage(topicId, params.lang);
    if (!topic) return NextResponse.json({ message: "Couldn't find this topic" });
    
    const posts = await GetPostsByTopicIdAndLanguage(topicId, params.lang);

    return NextResponse.json({ topic, posts });
}

interface RouteParams {
    params: {
        lang: string,
        topicId: string,
    }
}