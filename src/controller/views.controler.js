import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import { auth } from '../middlewares/auth.middleware.js'


const pm = new ProductManager('./data/products.json');

const router = Router()

routerViews.get('/home', (req, res) => {

    let products = pm.getProducts();
    
    res.render('home', { products });
})

routerViews.get('/realTimeProducts', (req, res) => {

    let products = pm.getProducts();

    res.render('realTimeProducts', { 
        title: 'Real Time Products',
        products
    });
})

router.get('/login', (req, res) => {

    res.render('login.handlebars')
})
  
router.get('/signup', (req, res) => {
    
    res.render('signup.handlebars')
})
  
router.get('/profile', auth, (req, res) => {

    const { user } = req.session
    res.render('profile.handlebars', { user })
})

export default router