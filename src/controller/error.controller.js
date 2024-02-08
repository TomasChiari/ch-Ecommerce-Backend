import { Router } from "express";

const router = Router();

router.get("/400", (req, res) => {
	res.status(400).json({ status: "Error", message: "Bad Request" });
	// res.render("e400");
});

router.get("/401", (req, res) => {
	res.status(401).json({ status: "Error", message: "Unautorized" });
	// res.render("e401");
});

router.get("/403", (req, res) => {
	res.status(403).json({ status: "Error", message: "Forbidden" });
	// res.render("e403");
});

export default router;
