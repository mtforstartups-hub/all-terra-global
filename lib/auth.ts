import { betterAuth } from "better-auth";
import { createClient } from "@libsql/client";
import { LibsqlDialect } from "@libsql/kysely-libsql";

// const database = new Database("auth.db");

// export const auth = betterAuth({
//   database: database,
//   baseURL: "http://localhost:3000/",
//   emailAndPassword: { enabled: true },
// });

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});


export const auth = betterAuth({
  database: {
    dialect: new LibsqlDialect({
      client: db as any,
    }),
    type: "sqlite"
  },
  baseURL: "http://localhost:3000/",
  emailAndPassword: { enabled: true },
});