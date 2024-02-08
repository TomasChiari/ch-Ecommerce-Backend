import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const mongoUri = process.env.MONGO_URI_DB;
export const mongoUriSessions = process.env.MONGO_URI_SESSIONS;
export const ghId = process.env.GH_ID;
export const ghSecret = process.env.GH_SECRET;
