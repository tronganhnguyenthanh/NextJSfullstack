import mysql from "mysql2/promise"
export const connectDB = async () => {
  const connection = await mysql.createConnection({
    host:"sql12.freesqldatabase.com",
    user:"sql12769132",
    password:"L6X7WrwMqp",
    database:"sql12769132"
  })
  return connection
}