import fs from 'node:fs';

export default class CartManager {
    constructor (path) {
        this.path = path;

        this.readCarts();

        if (this.#carts.length) this.#id = this.#carts[this.#carts.length - 1].id
    }

    #carts = [];
    #id = 1;

    readCarts() {
        try {
            this.#carts = JSON.parse(fs.readFileSync(this.path, { encoding: 'utf8', flag: 'r' }));
        }
        catch(err) {
            console.error('Error al leer los carritos', err);
        }
    }

    addCart () {
        const newCart = {
            id: this.#id += 1,
            products: []
        }

        this.#carts.push(newCart);

        fs.writeFileSync(this.path, JSON.stringify(this.#carts));
        console.log('carrito guardado exitosamente')
    }

    getCarts () {
        return this.#carts;
    }

    getCartById (id) {
        const cart = this.#carts.filter((cart) => cart.id === id)[0];
        
        return cart? cart : {'message': 'Error: product not found'}

    }

    updateCart(cartId, productId) {
        const posCart = this.#carts.findIndex(cart => cart.id === cartId);

        const posProd = this.#carts[posCart].products.findIndex(prod => prod.product === productId);

        console.log(posProd)
        if (posProd >= 0) {
            console.log(posProd)
            console.log(this.#carts[posCart].products[posProd].quantity)
            this.#carts[posCart].products[posProd].quantity++;
            console.log(this.#carts[posCart].products[posProd].quantity)

        } else {

            const newProd = {
                "product": productId,
                "quantity": 1
            }

            this.#carts[posCart].products.push(newProd)
        }

        fs.writeFileSync(this.path, JSON.stringify(this.#carts));
        console.log('Producto actualizado')
    }

}