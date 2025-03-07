import { Router } from "express";
import { loginController, registerController } from "~/controllers/users.controllers";
import { validateLogin } from "~/middlewares/users.middlewares";
const usersRouter = Router()



usersRouter.post('/login', validateLogin, loginController)
usersRouter.post('/register', registerController)


export default usersRouter