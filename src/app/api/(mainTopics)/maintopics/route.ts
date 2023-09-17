import { getMainTopics } from "@/helpers/db";
import { NextResponse } from "next/server";

export async function GET(_: Request) {
  const topics = await getMainTopics();

  return NextResponse.json({ topics });
}
