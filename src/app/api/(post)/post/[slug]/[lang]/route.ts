import { GetPostByTitleAndLanguage } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteParams) {    
    const post = await GetPostByTitleAndLanguage(params.slug, params.lang);

    return NextResponse.json({ post });
}

interface RouteParams {
    params: {
        slug: string,
        lang: string
    }
}