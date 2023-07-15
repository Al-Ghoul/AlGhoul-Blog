import { GetPostWithFullData } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: Props) {
    const post = await GetPostWithFullData(parseInt(params.id));

    return NextResponse.json({ ...post });
}

interface Props {
    params: {
        id: string
    }
}