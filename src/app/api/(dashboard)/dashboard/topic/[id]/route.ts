import { prisma } from "@/helpers/db"
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteProps) {
    const topic = await prisma.topic.findFirst({ where: { id: parseInt(params.id) } });
    if (!topic) return NextResponse.json({ message: "Couldn't find topic" });

    return NextResponse.json({ ...topic });
}

interface RouteProps {
    params: {
        id: string,
    }
}