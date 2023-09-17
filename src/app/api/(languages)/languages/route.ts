import { getLanguages } from '@/helpers/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  const count = request.nextUrl.searchParams.get("count");
  const orderByKey = request.nextUrl.searchParams.get("orderBy");
  const desc = request.nextUrl.searchParams.get("desc");
  const include = request.nextUrl.searchParams.get("include")?.split(',');


  let sortBy = "";
  if (orderByKey) {
    sortBy = "asc"
    if (desc !== null) sortBy = "desc";
  }

  if (include && include.length) {
    const inclusionParamList = ["posts", "language"];
    for (const inc of include) {
      if (!inc.length)
        return NextResponse.json({ error: true, message: "include query param can not be empty (either provide a value or omit it)" }, { status: 400 });
      else if (!inclusionParamList.includes(inc))
        return NextResponse.json({ error: true, message: `include query param should be on of the following ${inclusionParamList}` }, { status: 400 })
    }
  }

  const languages = await getLanguages({
    queryParams: {
      count,
      orderByKey,
      sortBy,
      include
    }
  });

  return NextResponse.json({ languages });
}