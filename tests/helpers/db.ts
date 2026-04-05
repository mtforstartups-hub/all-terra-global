import mysql from 'mysql2/promise';
import 'dotenv/config';

export async function verifyUserEmail(email: string) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    await connection.query('UPDATE user SET emailVerified = 1 WHERE email = ?', [email]);
  } finally {
    await connection.end();
  }
}

export async function deleteTestUser(email: string) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);
  try {
    const [rows] = await connection.query('SELECT id FROM user WHERE email = ?', [email]) as [any[], any];
    if (rows.length === 0) return;
    
    const userId = rows[0].id;
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('DELETE FROM session WHERE userId = ?', [userId]);
    await connection.query('DELETE FROM account WHERE userId = ?', [userId]);
    await connection.query('DELETE FROM verification WHERE identifier = ?', [email]);
    await connection.query('DELETE FROM user WHERE id = ?', [userId]);
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
  } finally {
    await connection.end();
  }
}