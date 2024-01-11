import prisma from "@/helpers/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: RouteProps) {
  const author = await prisma.author.findFirst({
    where: { name: { contains: params.authorName } },
  });
  if (!author) return NextResponse.json({ message: "Author was not found." });

  return NextResponse.json({ author });
}

interface RouteProps {
  params: {
    authorName: string;
  };
}

