import { GetTagsByLanguage } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteParams) {
    const tags = await GetTagsByLanguage(params.lang);

    return NextResponse.json({ tags });
}

interface RouteParams {
    params: {
        lang: string,
    }
}