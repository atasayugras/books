import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
  rejectUnauthorized: false, // Only if your database requires SSL and allows self-signed certificates
});


//  Log the exact error from the database connection attempt
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

console.log('Database URL:', process.env.DATABASE_URL);  // For debugging only



export default pool;
