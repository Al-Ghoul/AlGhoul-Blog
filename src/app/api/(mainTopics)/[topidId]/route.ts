import prisma from "@/helpers/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: RouteParams) {
  const topic = await prisma.topic.findFirst({
    where: { id: parseInt(params.topicId) },
  });

  return NextResponse.json({ topic });
}

interface RouteParams {
  params: {
    topicId: string;
  };
}

