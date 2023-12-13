import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const pm = new ProductManager('../data/products.json');

export const routerProducts = Router()

routerProducts.get('/api/products', (req, res) => {
    const limit = req.query.limit;

    const products = pm.getProducts().slice(0, limit);

    !(limit < 1) ? res.json(products) : res.json({'message':'Error: The limit must be an integer'})
    
})

routerProducts.get('/api/products/:prodId', (req, res) => {
    const prodId = Number(req.params.prodId)
    console.log(prodId)

    res.json(pm.getProductById(prodId))
})