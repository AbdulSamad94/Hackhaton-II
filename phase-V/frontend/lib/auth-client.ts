import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // Use the API URL from environment, fallback to a valid absolute URL for build-time stability
    baseURL: process.env.NEXT_PUBLIC_API_URL 
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth` 
        : "http://localhost:8000/api/auth",
});
