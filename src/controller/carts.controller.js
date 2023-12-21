import { Router } from 'express';
import cartManager from '../managers/cartManager.js';

const cm = new cartManager('./data/carts.json');

export const routerCarts = Router()

routerCarts.post('', (req, res) => {
    cm.addCart();
    res.json({'message':'Cart Created'});
})

routerCarts.get('', (req, res) => {
    //solo es para pruebas
    const carts = cm.getCarts();
    res.json(carts)
})

routerCarts.get('/:cartId', (req, res) => {
    const cartId = Number(req.params.cartId);

    res.json(cm.getCartById(cartId));
})

routerCarts.post('/:cartId/products/:prodId', (req, res) => {
    const cartId = Number(req.params.cartId);

    const prodId = Number(req.params.prodId);

    cm.updateCart(cartId, prodId);

    res.json({'message':'Cart Updated'});

})
