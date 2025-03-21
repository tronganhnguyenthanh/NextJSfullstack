import {connectDB} from "../../connectDB/connect"
export async function POST(request){
  const {projectName, projectLink} = await request.json()
  const sql = "INSERT INTO projects(projectName, projectLink) VALUES(?, ?)"
  const db = await connectDB()
  await db.execute(sql, [projectName, projectLink])
  return Response.json({message:"Project's domain added successfully"})
}

export async function GET(){
  const sql = "SELECT * FROM projects"
  const db = await connectDB()
  const listProjectDomain = await db.execute(sql)
  return Response.json(listProjectDomain)
}

