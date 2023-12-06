import express from 'express';
import ProductManager from './ProductManager.js';

const pm = new ProductManager('./data/products.json');
const port = 3000;

const app = express();

app.get('/products', (req, res) => {
    const limit = req.query.limit;

    const products = pm.getProducts().slice(0, limit);

    !(limit < 1) ? res.json(products) : res.json({'message':'Error: The limit must be an integer'})
    
})

app.get('/product/:prodId', (req, res) => {
    const prodId = Number(req.params.prodId)
    console.log(prodId)

    res.json(pm.getProductById(prodId))
})

app.listen(port, () => {
    console.log(`server running on port ${port} 🚀`);
})
