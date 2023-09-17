import { prisma } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const res = await request.json()
    const result = await prisma.post.findMany({ where: { content: { search: res.query } } });
    return NextResponse.json({ result });
}