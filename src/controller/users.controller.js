import { Router } from "express";
import { Users } from "../models/user.model.js";

const router = Router()

router.post('/', async (req, res) => {
    
    try {
      const { first_name, last_name, email, password } = req.body
  
      const newUserInfo = {
        first_name,
        last_name,
        email,
        password,
      }
  
      const user = await Users.create(newUserInfo)
  
      res.json({ status: 'Success', message: user })
    } catch (error) {

      res.status(500).json({ status: 'Error', message: 'Internal Server Error' })
    }

})

export default router