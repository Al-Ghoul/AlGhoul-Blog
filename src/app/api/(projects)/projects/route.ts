import prisma from "@/helpers/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const count = parseInt(searchParams.get("count") || "");
  const orderByKey = searchParams.get("orderBy");
  const sortBy = searchParams.get("sortBy");
  const languageCode = searchParams.get("langCode");
  const cursor = searchParams.get("cursor");
  const dir = searchParams.get("dir") as "bw" | "fw";

  if (
    !languageCode || !languageCode.length ||
    !["ar", "en"].includes(languageCode)
  ) {
    return NextResponse.json({
      error: true,
      message: "langCode query param is required, available codes are ar or en",
    }, { status: 400 });
  }

  if (count && isNaN(count) || count < 1) {
    return NextResponse.json({
      success: false,
      message: "count must be a positive integer",
    }, { status: 400 });
  }

  const { projects, extraValues } = await getProjects({
    queryParams: {
      count,
      orderByKey,
      languageCode,
      sortBy,
      cursor,
      dir,
    },
  });

  return NextResponse.json({ projects, ...extraValues, success: true });
}

async function getProjects({
  queryParams,
}: {
  queryParams: searchParamsType & { cursor?: string | null; dir?: "bw" | "fw" };
}) {
  const { languageCode, count, orderByKey, sortBy, dir, cursor } = queryParams;

  let queryString = {};
  let extraValues = {};
  if (count) {
    queryString = { ...queryString, take: count };

    if (!orderByKey) {
      queryString = {
        ...queryString,
        orderBy: { createdAt: sortBy || "desc" },
      };
    }

    if (dir) {
      queryString = {
        ...queryString,
        take: (dir === "bw") ? -(count + 1) : count + 1,
      };
    }
  }

  if (orderByKey && sortBy?.length) {
    queryString = { ...queryString, orderBy: { [orderByKey]: sortBy } };
  }

  if (cursor && cursor.length) {
    queryString = { ...queryString, cursor: { id: cursor }, skip: 1 };
    if (dir) {
      extraValues = (dir == "fw") ? { has_prev: true } : { has_next: true };
    }
  }

  const projects = await prisma.project.findMany({
    where: {
      language: { code: { equals: languageCode } },
    },
    ...queryString,
  });

  if (count && projects.length > count && dir) {
    if (dir == "fw") {
      extraValues = { has_next: true, has_prev: cursor !== null };
      projects.pop();
    } else if (dir == "bw") {
      projects.shift();
      extraValues = { has_prev: true };
    }
  }

  return {
    projects,
    extraValues,
  };
}
