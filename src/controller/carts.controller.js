import { Router } from "express";
import cartManager from "../managers/cartManager.js";

const cm = new cartManager("./data/carts.json");

const router = Router();

router.post("/", (req, res) => {
	cm.addCart();
	res.json({ message: "Cart Created" });
});

router.get("/", (req, res) => {
	//solo es para pruebas
	const carts = cm.getCarts();
	res.json(carts);
});

router.get("/:cartId", (req, res) => {
	const cartId = Number(req.params.cartId);

	res.json(cm.getCartById(cartId));
});

router.post("/:cartId/products/:prodId", (req, res) => {
	const cartId = Number(req.params.cartId);

	const prodId = Number(req.params.prodId);

	cm.updateCart(cartId, prodId);

	res.json({ message: "Cart Updated" });
});

export default router;
