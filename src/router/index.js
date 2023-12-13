import { routerProducts } from "../controller/products.controler.js"

export const router = app => {
    app.use('/api/products', routerProducts)
    // app.use('/api/carts', cartsController)
}