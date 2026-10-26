import mysql, { RowDataPacket } from "mysql2/promise";
import "dotenv/config";

const LOCAL_DB_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

/**
 * E2E runs create and delete users, so they must never touch a non-local database.
 * Call this in beforeAll before any write happens.
 */
export function assertLocalDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set - refusing to run e2e tests.");
  }

  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    throw new Error(
      "DATABASE_URL is not a valid mysql:// URI - refusing to run e2e tests.",
    );
  }

  if (!LOCAL_DB_HOSTS.has(host)) {
    throw new Error(
      `Refusing to run e2e tests against a non-local database (host: ${host}). ` +
        "Point DATABASE_URL at localhost/127.0.0.1 first.",
    );
  }
}

export async function userExists(email: string): Promise<boolean> {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT id FROM user WHERE email = ?",
      [email],
    );
    return rows.length > 0;
  } finally {
    await connection.end();
  }
}

export async function verifyUserEmail(email: string) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    await connection.query(
      "UPDATE user SET emailVerified = 1 WHERE email = ?",
      [email],
    );
  } finally {
    await connection.end();
  }
}

export async function deleteTestUser(email: string) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    const [rows] = await connection.query<({ id: string } & RowDataPacket)[]>(
      "SELECT id FROM user WHERE email = ?",
      [email],
    );

    if (rows.length === 0) return;

    const userId = rows[0].id;
    await connection.beginTransaction();
    try {
      await connection.query("DELETE FROM session WHERE userId = ?", [userId]);
      await connection.query("DELETE FROM account WHERE userId = ?", [userId]);
      await connection.query("DELETE FROM verification WHERE identifier = ?", [
        email,
      ]);
      await connection.query("DELETE FROM user WHERE id = ?", [userId]);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  } finally {
    await connection.end();
  }
}
