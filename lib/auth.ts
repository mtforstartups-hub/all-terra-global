import { betterAuth } from "better-auth";
import mysql from "mysql2/promise";

// Database connection pool for MariaDB / MySQL
const connection = mysql.createPool({
  uri: process.env.DATABASE_URL!,
});

export const auth = betterAuth({
  database: connection,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  emailAndPassword: { enabled: true },
});