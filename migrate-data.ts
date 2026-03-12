import "dotenv/config";
import { createClient } from "@libsql/client";
import mysql from "mysql2/promise";

async function migrateData() {
  console.log("Connecting to databases...");
  
  if (!process.env.TURSO_DATABASE_URL || !process.env.DATABASE_URL) {
    console.error("Missing TURSO_DATABASE_URL or DATABASE_URL in .env");
    process.exit(1);
  }

  const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const mysqlDb = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
  });

  console.log("Creating tables in MariaDB/MySQL...");

  const createTables = [
    `CREATE TABLE IF NOT EXISTS user (
      id VARCHAR(255) PRIMARY KEY,
      name TEXT NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      emailVerified BOOLEAN NOT NULL,
      image TEXT,
      createdAt DATETIME(3) NOT NULL,
      updatedAt DATETIME(3) NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS session (
      id VARCHAR(255) PRIMARY KEY,
      expiresAt DATETIME(3) NOT NULL,
      token VARCHAR(255) NOT NULL UNIQUE,
      createdAt DATETIME(3) NOT NULL,
      updatedAt DATETIME(3) NOT NULL,
      ipAddress TEXT,
      userAgent TEXT,
      userId VARCHAR(255) NOT NULL REFERENCES user(id)
    );`,
    `CREATE TABLE IF NOT EXISTS account (
      id VARCHAR(255) PRIMARY KEY,
      accountId VARCHAR(255) NOT NULL,
      providerId VARCHAR(255) NOT NULL,
      userId VARCHAR(255) NOT NULL REFERENCES user(id),
      accessToken TEXT,
      refreshToken TEXT,
      idToken TEXT,
      accessTokenExpiresAt DATETIME(3),
      refreshTokenExpiresAt DATETIME(3),
      scope TEXT,
      password TEXT,
      createdAt DATETIME(3) NOT NULL,
      updatedAt DATETIME(3) NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS verification (
      id VARCHAR(255) PRIMARY KEY,
      identifier TEXT NOT NULL,
      value TEXT NOT NULL,
      expiresAt DATETIME(3) NOT NULL,
      createdAt DATETIME(3),
      updatedAt DATETIME(3)
    );`
  ];

  for (const stmt of createTables) {
    await mysqlDb.execute(stmt);
  }
  console.log("Tables created/verified.");

  const toDate = (val: any) => {
    if (!val) return null;
    return new Date(val); // mysql2 will automatically format JS Date objects
  };

  const toBool = (val: any) => {
    if (val === null || val === undefined) return null;
    return val ? 1 : 0;
  };

  console.log("Migrating users...");
  const users = await turso.execute("SELECT * FROM user");
  for (const row of users.rows) {
    await mysqlDb.execute(
      "INSERT IGNORE INTO user (id, name, email, emailVerified, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [row.id, row.name, row.email, toBool(row.emailVerified), row.image, toDate(row.createdAt), toDate(row.updatedAt)] as any[]
    );
  }
  console.log(`Migrated ${users.rows.length} users.`);

  console.log("Migrating sessions...");
  try {
    const sessions = await turso.execute("SELECT * FROM session");
    for (const row of sessions.rows) {
      await mysqlDb.execute(
        "INSERT IGNORE INTO session (id, expiresAt, token, createdAt, updatedAt, ipAddress, userAgent, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [row.id, toDate(row.expiresAt), row.token, toDate(row.createdAt), toDate(row.updatedAt), row.ipAddress, row.userAgent, row.userId] as any[]
      );
    }
    console.log(`Migrated ${sessions.rows.length} sessions.`);
  } catch(e) { console.log("No sessions to migrate or error:", e) }

  console.log("Migrating accounts...");
  try {
    const accounts = await turso.execute("SELECT * FROM account");
    for (const row of accounts.rows) {
      await mysqlDb.execute(
        "INSERT IGNORE INTO account (id, accountId, providerId, userId, accessToken, refreshToken, idToken, accessTokenExpiresAt, refreshTokenExpiresAt, scope, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [row.id, row.accountId, row.providerId, row.userId, row.accessToken, row.refreshToken, row.idToken, toDate(row.accessTokenExpiresAt), toDate(row.refreshTokenExpiresAt), row.scope, row.password, toDate(row.createdAt), toDate(row.updatedAt)] as any[]
      );
    }
    console.log(`Migrated ${accounts.rows.length} accounts.`);
  } catch(e) { console.log("No accounts to migrate or error:", e) }

  console.log("Migrating verifications...");
  try {
    const verifications = await turso.execute("SELECT * FROM verification");
    for (const row of verifications.rows) {
      await mysqlDb.execute(
        "INSERT IGNORE INTO verification (id, identifier, value, expiresAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
        [row.id, row.identifier, row.value, toDate(row.expiresAt), toDate(row.createdAt), toDate(row.updatedAt)] as any[]
      );
    }
    console.log(`Migrated ${verifications.rows.length} verifications.`);
  } catch (e) { console.log("No verifications to migrate or error:", e) }

  console.log("✅ Data migration complete!");
  process.exit(0);
}

migrateData().catch(console.error);
