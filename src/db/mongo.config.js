import mongoose from "mongoose";
import { mongoUri } from "../config/server.config.js";

export const dbConnect = async () => {
	try {
		await mongoose.connect(mongoUri);
		console.log("Database is Connected💽💽");
	} catch (error) {
		console.error(error);
	}
};
