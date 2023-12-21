import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';


const pm = new ProductManager('./data/products.json');

export const routerViews = Router()

routerViews.get('/home', (req, res) => {

    let products = pm.getProducts();
    
    res.render('home.handlebars', { products });
})

routerViews.get('/realTimeProducts', (req, res) => {

    let products = pm.getProducts();

    res.render('realTimeProducts.handlebars', { products });
})