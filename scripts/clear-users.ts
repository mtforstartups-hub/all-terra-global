// scripts/clear-users.ts
import "dotenv/config";
import mysql from "mysql2/promise";

async function deleteAllUsers() {
  // We use createConnection here instead of createPool for a single script run
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);

  try {
    console.log("🗑️  Starting database cleanup...");

    // 1. Disable foreign key checks temporarily so we can truncate tables safely
    await connection.query("SET FOREIGN_KEY_CHECKS = 0;");

    // 2. Truncate (empty) all auth-related tables
    // TRUNCATE is faster than DELETE and resets auto-increment IDs back to 1
    await connection.query("TRUNCATE TABLE session;");
    await connection.query("TRUNCATE TABLE account;");
    await connection.query("TRUNCATE TABLE verification;");
    await connection.query("TRUNCATE TABLE user;");

    // 3. Re-enable foreign key checks
    await connection.query("SET FOREIGN_KEY_CHECKS = 1;");

    console.log(
      "✅ All users, sessions, and accounts have been successfully deleted.",
    );
  } catch (error) {
    console.error("❌ Error wiping database:", error);
  } finally {
    await connection.end();
    process.exit(0);
  }
}

deleteAllUsers();
