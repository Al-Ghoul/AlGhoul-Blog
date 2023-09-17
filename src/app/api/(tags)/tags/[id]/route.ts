import { prisma } from "@/helpers/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: RouteParams) {
  const include = request.nextUrl.searchParams.get("include")?.split(',');

  if (include && include.length) {
    const inclusionParamList = ["language", "posts"];
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
  const tagId = parseInt(params.id)
  if (isNaN(tagId))
    return NextResponse.json({ error: true, message: "tagId must be a number identifying a tag" }, { status: 400 });


  const tag = await prisma.tag.findFirst({
    where: {
      id: { equals: tagId },
    },
    ...queryString,
  })
  return NextResponse.json({ tag });
}

interface RouteParams {
  params: {
    id: string
  }
}