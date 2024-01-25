import { app } from "./server.js";
import { port } from "./config/server.config.js"
import { Server } from 'socket.io'
import ProductManager from '../src/managers/ProductManager.js';

const pm = new ProductManager('./data/products.json');
const products = pm.getProducts()

const httpServer = app.listen(port, () => {
    console.log(`server running on port ${port} 🚀`);
})

const io = new Server(httpServer)

io.on("connection", socket => {
    socket.emit('sendProducts', products)

    socket.on('addProduct', data => {
        const {title, description, code, price, stock, category, thumbnail} = data
        pm.addProduct(title, description, code, price, stock, category, thumbnail)
    })
})