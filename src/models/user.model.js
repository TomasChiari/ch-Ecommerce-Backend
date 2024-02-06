import Mongoose from "mongoose";

const userSchemas = new Mongoose.Schema({
	first_name: String,
	last_name: String,
	email: { type: String, unique: true },
	password: String,
	role: { type: String, enum: ["user", "admin"], default: "user" },
});

export const Users = Mongoose.model("user", userSchemas);
