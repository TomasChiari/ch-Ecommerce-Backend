import { Router } from "express";
import passport from "passport";

const router = Router();

router.post(
	"/",
	passport.authenticate("login", { failureRedirect: "/errors/400" }),
	async (req, res) => {
		try {
			req.session.user = {
				first_name: req.user.first_name,
				last_name: req.user.last_name,
				email: req.user.email,
				role: req.user.role,
			};
			req.session.auth = true;

			res.redirect("/profile");
		} catch (error) {
			res.status(500).json({ status: "Error", message: "Internal Server Error" });
		}
	}
);

router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
			return res.json({ error: err });
		}

		res.redirect("/login");
	});
});

router.get(
	"/github",
	passport.authenticate("github", { scope: ["user: email"] }, (req, res) => {})
);

router.get(
	"/githubcallback",
	passport.authenticate("github", { failureRedirect: "/login" }),
	(req, res) => {
		req.session.user = req.user;
		req.session.auth = true;
		res.redirect("/profile");
	}
);

export default router;
