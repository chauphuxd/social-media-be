import { Router } from "express";
import { loginController, registerController } from "~/controllers/users.controllers";
import { registerValidator, validateLogin } from "~/middlewares/users.middlewares";
import { validate } from "~/utils/validation";
const usersRouter = Router()



usersRouter.post('/login', validateLogin, loginController)
/**
 * Description : Register a new user
 * Path: /register
 * Method: POST
 * Body : (name : string, email : string, password : string, confirm_password : string,  date_of_birth: ISOstring )
 */
usersRouter.post('/register', registerValidator, registerController)


export default usersRouter