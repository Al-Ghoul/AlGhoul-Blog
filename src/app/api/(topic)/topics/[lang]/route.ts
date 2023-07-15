import { GetTopicsByLanguage } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteProps) {
    const topics = await GetTopicsByLanguage(params.lang);

    return NextResponse.json(topics);
}

interface RouteProps {
    params: {
        lang: string,
    }
}