import { createAuthClient } from "better-auth/react"
import type { auth } from "./auth"
import { inferAdditionalFields } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        inferAdditionalFields<typeof auth>(),
    ],
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
})
