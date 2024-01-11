import prisma from "@/helpers/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: RouteParams) {
  const include = request.nextUrl.searchParams.get("include")?.split(",");
  const langId = request.nextUrl.searchParams.get("langId");

  if (!langId || !langId.length || !["1", "2"].includes(langId)) {
    return NextResponse.json(
      {
        error: true,
        message:
          "langId query param is required, available Ids are either 1 or 2",
      },
      { status: 400 },
    );
  }

  if (include && include.length) {
    const inclusionParamList = ["language", "topic"];
    for (const inc of include) {
      if (!inc.length)
        return NextResponse.json(
          {
            error: true,
            message:
              "include query param can not be empty (either provide a value or omit it)",
          },
          { status: 400 },
        );
      else if (!inclusionParamList.includes(inc))
        return NextResponse.json(
          {
            error: true,
            message: `include query param should be on of the following ${inclusionParamList}`,
          },
          { status: 400 },
        );
    }
  }

  let queryString = {};
  if (include?.length) {
    const inclusionQueryString = {} as { [key: string]: any };
    for (const inclusionStr of include) {
      inclusionQueryString[inclusionStr] = true;
    }
    queryString = { ...queryString, include: inclusionQueryString };
  }

  const topicTranslation = await prisma.topic_Language_Translation.findFirst({
    where: {
      topicId: parseInt(params.topicId),
      languageId: parseInt(langId),
    },
    ...queryString,
  });

  return NextResponse.json({ topicTranslation });
}

interface RouteParams {
  params: {
    topicId: string;
  };
}

