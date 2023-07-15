import { GetAuthorById } from "@/helpers/db"
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteProps) {
    const author = await GetAuthorById(parseInt(params.id));
    if (!author) return NextResponse.json({ message: "Couldn't find author" });

    return NextResponse.json({ ...author });
}

interface RouteProps {
    params: {
        id: string,
    }
}