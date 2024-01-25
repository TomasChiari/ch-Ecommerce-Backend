const socket = io()

const formContainer = document.getElementById('form-container')

const formTitle = document.getElementById('title')
const formDescription = document.getElementById('description')
const formCode = document.getElementById('code')
const formPrice = document.getElementById('price')
const formStock = document.getElementById('stock')
const formCategory = document.getElementById('category')
const formThumbnail= document.getElementById('thumbnail')

const buttonAddProduct = document.getElementById('button-add-product')

const newProduct = {
    title: formTitle.value,
    description: formDescription.value,
    code: formCode.value,
    price: formPrice.value,
    stock: formStock.value,
    category: formCategory.value,
    thumbnail: formThumbnail.value
}

socket.on('sendProducts', products => {
    console.log(products)
})

buttonAddProduct.addEventListener('click', () => {
    console.log('click')
    socket.emit('addProduct', newProduct)
})

