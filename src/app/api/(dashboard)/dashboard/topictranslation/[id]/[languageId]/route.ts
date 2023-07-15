import { GetTopicTranslationByIdAndLanguage } from "@/helpers/db"
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteParams) {
    const topicTranslation = await GetTopicTranslationByIdAndLanguage(parseInt(params.id), parseInt(params.languageId));
    if (!topicTranslation) return NextResponse.json({ message: "Couldn't find topic translation" });

    return NextResponse.json({ ...topicTranslation });
}

interface RouteParams {
    params: {
        id: string,
        languageId: string,
    }
}