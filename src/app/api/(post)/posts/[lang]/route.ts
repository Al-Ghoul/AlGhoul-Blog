import { GetTopTwoPostsByLanguageAndSortedByDate } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteParams) {
    const posts = await GetTopTwoPostsByLanguageAndSortedByDate(params.lang);

    return NextResponse.json({ posts });
}

interface RouteParams {
    params: {
        lang: string,
    }
}