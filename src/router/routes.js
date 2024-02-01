import routerProducts from "../controller/products.controler.js";
import routerCarts from "../controller/carts.controller.js";
import routerViews from "../controller/views.controler.js";
import routerAuth from "../controller/auth.controller.js";
import routerUsers from "../controller/users.controller.js";

export const router = app => {
    app.use('/api/products', routerProducts);
    app.use('/api/carts', routerCarts);
    app.use('/', routerViews);
    app.use('/auth', routerAuth);
    app.use('/api/users', routerUsers);
}