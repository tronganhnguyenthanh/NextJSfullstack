import {connectDB} from "../../../connectDB/connect"
export async function GET(request){
  const filterById = await request.nextUrl.searchParams
  const id = await filterById.get("id")
  const db = await connectDB()
  const sql = "SELECT * FROM projects WHERE id=?"
  const searchProject = await db.execute(sql, [id])
  return Response.json(searchProject)
}