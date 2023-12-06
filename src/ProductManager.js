import fs from 'node:fs';

export default class ProductManager {
    constructor (path) {
        this.path = path;

        this.#id = 1;

        this.readProducts();
    }

    #products = [];
    #codes = [];
    #id;

    readProducts() {
        try {
            this.#products = JSON.parse(fs.readFileSync(this.path, { encoding: 'utf8', flag: 'r' }));
            this.#codes = this.#products.map(prod => prod.code);          
        }
        catch(err) {
            console.error('Error al leer los productos', err);
        }
    }

    addProduct (title, description, price, thumbnail, code, stock) {

        if (this.#codes.includes(code)) {

            console.error("Ya existe un producto con ese codigo");

        }else {

            const newProd = {
                id: this.#id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
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

    updateProduct(id, description, price, stock) {

        const pos = this.#products.findIndex(prod => prod.id === id);

        const updatedProduct = {
            id,
            title: this.#products[pos].title,
            description,
            price,
            thumbnail: this.#products[pos].thumbnail,
            code: this.#products[pos].code,
            stock
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

// let pm = new ProductManager('./products.json');

// pm.addProduct("test1", "testeo de descripcion 1", 540, "./images/1", 'abc123', 4);
// pm.addProduct("test2", "testeo de descripcion 2", 170, "./images/2", 'opq456', 8);
// // pm.addProduct("test3", "testeo de descripcion 3", 450, "./images/3", 'xyz789', 6);
// // pm.addProduct("test4", "testeo de descripcion 4", 480, "./images/4", 'xyz789', 9);


// console.log(pm.getProducts())

// pm.updateProduct(2, "testeo de descripcion 2 modificada", 280, 2)

// console.log(pm.getProductById(2))

// pm.deleteProduct(2)

// console.log(pm.getProducts())


