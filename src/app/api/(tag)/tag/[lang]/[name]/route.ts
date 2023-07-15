import { GetPostsByTagAndLanguage } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteProps) {
    console.log(params)
    const posts = await GetPostsByTagAndLanguage(params.name, params.lang);

    return NextResponse.json({ posts });
}

interface RouteProps {
    params: {
        lang: string,
        name: string,
    }
}