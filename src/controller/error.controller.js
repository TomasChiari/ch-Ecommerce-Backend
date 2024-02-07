import { Router } from "express";

const router = Router();

router.get("/401", (req, res) => {
	res.render("e401");
});

router.get("/403", (req, res) => {
	res.render("e403");
});

export default router;
