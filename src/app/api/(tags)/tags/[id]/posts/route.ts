import prisma from "@/helpers/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: RouteProps) {
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

  const tagId = parseInt(params.id);
  if (isNaN(tagId))
    return NextResponse.json(
      { error: true, message: "tagId must be a number identifying a tag" },
      { status: 400 },
    );

  const posts = await prisma.post.findMany({
    where: {
      tags: { some: { id: tagId } },
    },
  });

  return NextResponse.json({ posts });
}

interface RouteProps {
  params: {
    id: string;
  };
}

