// scripts/migrate.ts
import mysql from "mysql2/promise";
import "dotenv/config";

async function runMigration() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.error("❌ DATABASE_URL is missing in your environment variables.");
    process.exit(1);
  }

  console.log(`Connecting to database...`);

  try {
    const connection = await mysql.createConnection(dbUrl);
    console.log("✅ Connected successfully. Starting migration...");

    // 1. Create the User table (with our custom NDA column)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user (
        id VARCHAR(191) PRIMARY KEY,
        name TEXT NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        emailVerified BOOLEAN NOT NULL DEFAULT FALSE,
        image TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        hasSignedNda BOOLEAN NOT NULL DEFAULT FALSE
      );
    `);
    console.log("✅ Created 'user' table.");

    // 2. Create the Session table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS session (
        id VARCHAR(191) PRIMARY KEY,
        userId VARCHAR(191) NOT NULL,
        token VARCHAR(191) NOT NULL UNIQUE,
        expiresAt TIMESTAMP NOT NULL,
        ipAddress TEXT,
        userAgent TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Created 'session' table.");

    // 3. Create the Account table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS account (
        id VARCHAR(191) PRIMARY KEY,
        userId VARCHAR(191) NOT NULL,
        accountId TEXT NOT NULL,
        providerId TEXT NOT NULL,
        accessToken TEXT,
        refreshToken TEXT,
        accessTokenExpiresAt TIMESTAMP NULL,
        refreshTokenExpiresAt TIMESTAMP NULL,
        scope TEXT,
        idToken TEXT,
        password TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Created 'account' table.");

    // 4. Create the Verification table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS verification (
        id VARCHAR(191) PRIMARY KEY,
        identifier TEXT NOT NULL,
        value TEXT NOT NULL,
        expiresAt TIMESTAMP NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'verification' table.");

    await connection.end();
    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:");
    console.error(error);
    process.exit(1);
  }
}

runMigration();
