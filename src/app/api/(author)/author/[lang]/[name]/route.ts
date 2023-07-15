import { GetAuthorByName, GetPostsByAuthorAndLanguage } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteProps) {
    const author = await GetAuthorByName(params.name);
    if (!author) return NextResponse.json({ message: "Author was not found." });

    const authorsPosts = await GetPostsByAuthorAndLanguage(author.name, params.lang);

    return NextResponse.json({ author, authorsPosts });
}


interface RouteProps {
    params: {
        lang: string,
        name: string,
    }
}