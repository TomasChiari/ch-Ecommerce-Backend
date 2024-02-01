import { Router } from "express";
import { Users } from "../models/user.model.js";

const router = Router()

router.post('/', async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({email})

      if (!user) return res.json({message: 'Bad Request'})

      if (user.password !== password) return res.json({ message: 'Bad request' })

      req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      }
      req.session.auth = true
  
      res.redirect('/profile')
    } catch (error) {
      res.status(500).json({ status: 'Error', message: 'Internal Server Error' })
    }

})

router.get('/logout', (req, res) => {

    req.session.destroy(err => {

      if (err) {
        console.log('err')
        console.log(err)
        return res.json({ error: err })
      }
      
      res.redirect('/login')
    })
  })

export default router