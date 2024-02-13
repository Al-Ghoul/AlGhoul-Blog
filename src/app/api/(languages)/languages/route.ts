import { getLanguages } from "@/helpers/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const count = parseInt(searchParams.get("count") || "");
  const orderByKey = searchParams.get("orderBy");
  const desc = searchParams.get("desc");
  const include = searchParams.get("include")?.split(",");

  let sortBy = "";
  if (orderByKey) {
    sortBy = "asc";
    if (desc !== null) sortBy = "desc";
  }

  if (include && include.length) {
    const inclusionParamList = ["posts", "language"];
    for (const inc of include) {
      if (!inc.length) {
        return NextResponse.json({
          error: true,
          message:
            "include query param can not be empty (either provide a value or omit it)",
        }, { status: 400 });
      } else if (!inclusionParamList.includes(inc)) {
        return NextResponse.json({
          error: true,
          message:
            `include query param should be on of the following ${inclusionParamList}`,
        }, { status: 400 });
      }
    }
  }

  if (count && isNaN(count) || count < 1) {
    return NextResponse.json({
      success: false,
      message: "count must be a positive integer",
    }, { status: 400 });
  }

  const languages = await getLanguages({
    queryParams: {
      count,
      orderByKey,
      sortBy,
      include,
    },
  });

  return NextResponse.json({ languages });
}
