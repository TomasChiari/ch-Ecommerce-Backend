import { routerProducts } from "../controller/products.controler.js"
import { routerCarts } from "../controller/carts.controller.js"

export const router = app => {
    app.use('/api/products', routerProducts)
    app.use('/api/carts', routerCarts)
}