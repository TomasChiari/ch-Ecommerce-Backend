import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
	"/",
	passport.authenticate("register", { failureRedirect: "/errors/400" }),
	(req, res) => {
		try {
			res.status(201).json({
				status: "Success",
				message: "User has been created",
			});
		} catch (error) {
			res.status(500).json({ status: "Error", message: "My Internal Server Error" });
		}
	}
);

export default router;
