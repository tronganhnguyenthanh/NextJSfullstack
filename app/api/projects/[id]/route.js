import {connectDB} from "../../../connectDB/connect"
export async function DELETE(request, {params}){
  const {id} = await params
  const sql = "DELETE FROM projects WHERE id=?"
  const db = await connectDB()
  await db.execute(sql, [id])
  return Response.json({message:"Project's domain deleted successfully"})
}
