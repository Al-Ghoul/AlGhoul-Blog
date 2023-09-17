import { prisma } from "@/helpers/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: RouteParams) {
    const include = request.nextUrl.searchParams.get("include")?.split(',');

    if (include && include.length) {
        const inclusionParamList = ["author", "language", "tags", "topic"];
        for (const inc of include) {
            if (!inc.length)
                return NextResponse.json({ error: true, message: "include query param can not be empty (either provide a value or omit it)" }, { status: 400 });
            else if (!inclusionParamList.includes(inc))
                return NextResponse.json({ error: true, message: `include query param should be on of the following ${inclusionParamList}` }, { status: 400 })
        }
    }

    let queryString = {}
    if (include?.length) {
        const inclusionQueryString = {} as { [key: string]: any };
        for (const inclusionStr of include) {
            inclusionQueryString[inclusionStr] = true;
        }
        queryString = { ...queryString, include: inclusionQueryString };
    }

    const postId = parseInt(params.id)
    if (isNaN(postId))
        return NextResponse.json({ error: true, message: "postId must be a number identifying a post" }, { status: 400 });

    const post = await prisma.post.findFirst({
        where: {
            id: { equals: postId },
        },
        ...queryString,
    })
    return NextResponse.json({ post });
}

interface RouteParams {
    params: {
        id: string
    }
}