import fs from 'node:fs';

export default class ProductManager {
    constructor (path) {
        this.path = path;

        this.readProducts();

        if (this.#products.length) this.#id = this.#products[this.#products.length - 1].id
    }

    #products = [];
    #codes = [];
    #id = 1;

    readProducts() {
        try {
            this.#products = JSON.parse(fs.readFileSync(this.path, { encoding: 'utf8', flag: 'r' }));
            this.#codes = this.#products.map(prod => prod.code);          
        }
        catch(err) {
            console.error('Error al leer los productos', err);
        }
    }

    addProduct (title, description, code, price, stock, category, thumbnail) {

        if (this.#codes.includes(code)) {

            console.error("Ya existe un producto con ese codigo");

        }else {

            const newProd = {
                id: this.#id += 1,
                title,
                description,
                code,
                price,
                status: true,
                stock,
                category,
                thumbnail,
            };

            this.#products.push(newProd);
            this.#codes.push(code);

            fs.writeFileSync(this.path, JSON.stringify(this.#products));
            console.log('Producto guardado exitosamente');
        }
    }

    getProducts () {
        return this.#products;
    }

    getProductById (id) {

        const product = this.#products.filter((prod) => prod.id === id)[0];
        
        return product? product : {'message': 'Error: product not found'}

    }

    updateProduct(id, description, price, status, stock) {

        const pos = this.#products.findIndex(prod => prod.id === id);

        const updatedProduct = {
            id: this.#products[pos].id,
            title: this.#products[pos].title,
            description,
            code: this.#products[pos].code,
            price,
            status,
            stock,
            category: this.#products[pos].category,
            thumbnail: this.#products[pos].thumbnail,
        };

        this.#products[pos] = updatedProduct;
        fs.writeFileSync(this.path, JSON.stringify(this.#products));
        console.log('Producto actualizado')

    }

    deleteProduct(id) {
        
        const newProductsList = this.#products.filter(prod => prod.id !== id);

        this.#products = newProductsList;
        fs.writeFileSync(this.path, JSON.stringify(this.#products));
        console.log('Producto Eliminado')
    }
}