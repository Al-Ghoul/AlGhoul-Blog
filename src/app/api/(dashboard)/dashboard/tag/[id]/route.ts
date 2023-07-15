import { GetTagById } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: RouteParams) {
    const tag = await GetTagById(parseInt(params.id));
    if (!tag) return NextResponse.json({ message: "Couldn't find tag" });

    return NextResponse.json({ ...tag });
}

interface RouteParams {
    params: {
        id: string,
    }
}