import { prisma } from "@/helpers/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(_: NextRequest, { params }: RouteProps) {
  const author = await prisma.author.findFirst({ where: { name: { contains: params.authorName } } });
  if (!author) return NextResponse.json({ message: "Author was not found." });

  const authorsPosts = await prisma.post.findMany({
    where: {
      author: { name: { contains: author.name } },
    }
  })

  return NextResponse.json({ author, authorsPosts });
}


interface RouteProps {
  params: {
    authorName: string,
  }
}