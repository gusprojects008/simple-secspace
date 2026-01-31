/* 
'pg' is a Node.js driver for PostgreSQL
The defined Pool object is a blueprint for creating a real object (an instance) of a connection manager; this object will be used to perform operations on the database
*/
import { Pool } from "pg"; // Constructor
const pool = new Pool({ // Instance
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT,
});
export const query = async (text, params) => pool.query(text, params); // Exporting the pool object to make it accessible by other modules
