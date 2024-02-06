import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const pm = new ProductManager("./data/products.json");

const router = Router();

router.get("", (req, res) => {
	const limit = req.query.limit;

	const products = pm.getProducts().slice(0, limit);

	!(limit < 1)
		? res.json(products)
		: res.json({ message: "Error: The limit must be an integer" });
});

router.get("/:prodId", (req, res) => {
	const prodId = Number(req.params.prodId);

	res.json(pm.getProductById(prodId));
});

router.post("", (req, res) => {
	const { title, description, code, price, stock, category, thumbnail } = req.body;

	pm.addProduct(title, description, code, price, stock, category, thumbnail);

	res.json({ message: "Product Created" });
});

router.put("/:prodId", (req, res) => {
	const prodId = Number(req.params.prodId);
	const { description, price, status, stock } = req.body;

	pm.updateProduct(prodId, description, price, status, stock);

	res.json({ message: "Product Updated" });
});

router.delete("/:prodId", (req, res) => {
	const prodId = Number(req.params.prodId);

	pm.deleteProduct(prodId);

	res.json({ message: "Product Deleted" });
});

export default router;
