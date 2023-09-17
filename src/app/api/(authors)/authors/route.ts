import { getAuthors } from '@/helpers/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    const count = request.nextUrl.searchParams.get("count");
    const orderByKey = request.nextUrl.searchParams.get("orderBy");
    const desc = request.nextUrl.searchParams.get("desc");
    const include = request.nextUrl.searchParams.get("include")?.split(',');
    const languageCode = request.nextUrl.searchParams.get("langCode");

    if (languageCode?.length && !["ar", "en"].includes(languageCode)) {
        return NextResponse.json({ error: true, message: "langCode query param is required, available codes are ar or en" }, { status: 400 });
    }

    let sortBy = "";
    if (orderByKey) {
        sortBy = "asc"
        if (desc !== null) sortBy = "desc";
    }

    if (include && include.length) {
        const inclusionParamList = ["posts", "language"];
        for (const inc of include) {
            if (!inc.length)
                return NextResponse.json({ error: true, message: "include query param can not be empty (either provide a value or omit it)" }, { status: 400 });
            else if (!inclusionParamList.includes(inc))
                return NextResponse.json({ error: true, message: `include query param should be on of the following ${inclusionParamList}` }, { status: 400 })
        }
    }

    const authors = await getAuthors({
        queryParams: {
            languageCode: languageCode || undefined,
            count,
            orderByKey,
            sortBy,
            include
        }
    });

    return NextResponse.json({ authors });
}