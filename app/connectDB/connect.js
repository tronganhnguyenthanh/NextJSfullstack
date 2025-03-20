import mysql from "mysql2/promise"
export const connectDB = async () => {
  const connection = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"project_domain_link"
  })
  return connection
}