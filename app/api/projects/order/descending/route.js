import {connectDB} from "../../../../connectDB/connect"
export async function GET(request){
  const sql = "SELECT * FROM projects ORDER BY projectName DESC"
  const db = await connectDB()
  const searchParams = await request.nextUrl.searchParams
  const sort = await searchParams.get("sort")
  const sortInDesc = await db.execute(sql, [sort])
  return Response.json(sortInDesc)
}