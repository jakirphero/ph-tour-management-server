import dotenv from "dotenv"

dotenv.config()

interface EnvConfig {
    PORT: string,
    DB_KEY: string,
    NODE_ENV: "development" | "production"
}

const loadEnvFile = (): EnvConfig => {
    const requireVar: string[] = ["PORT", "DB_KEY", "NODE_ENV"];
    requireVar.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`)
        }
    })
    return {
        PORT: process.env.PORT as string,
        DB_KEY: process.env.DB_KEY as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production"
    }
}

export const envVars = loadEnvFile();