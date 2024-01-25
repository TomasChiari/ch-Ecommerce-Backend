import { routerProducts } from "../controller/products.controler.js"
import { routerCarts } from "../controller/carts.controller.js"
import { routerViews } from "../controller/views.controler.js"

export const router = app => {
    app.use('/api/products', routerProducts)
    app.use('/api/carts', routerCarts)
    app.use('/', routerViews)
}