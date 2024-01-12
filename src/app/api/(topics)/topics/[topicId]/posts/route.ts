import prisma from "@/helpers/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: RouteParams) {
  const languageCode = request.nextUrl.searchParams.get("langCode");

  if (
    !languageCode ||
    !languageCode.length ||
    !["ar", "en"].includes(languageCode)
  ) {
    return NextResponse.json(
      {
        error: true,
        message:
          "langCode query param is required, available codes are ar or en",
      },
      { status: 400 },
    );
  }

  const topicId = parseInt(params.topicId);
  if (isNaN(topicId))
    return NextResponse.json(
      { error: true, message: "topicId must be a number identifying a topic" },
      { status: 400 },
    );

  const topic = await prisma.topic_Language_Translation.findFirst({
    where: { topicId: topicId, language: { code: languageCode } },
  });
  if (!topic)
    return NextResponse.json(
      { message: "Couldn't find this topic" },
      { status: 404 },
    );

  const posts = await prisma.post.findMany({
    where: { topicId: topicId, language: { code: languageCode } },
  });

  return NextResponse.json({ topic, posts });
}

interface RouteParams {
  params: {
    topicId: string;
  };
}

