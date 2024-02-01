import dotenv from 'dotenv'

dotenv.config()

export const port = process.env.PORT
export const mongoUri = process.env.MONGO_URI
export const mongoUriSessions = process.env.MONGO_URI_SESSIONS