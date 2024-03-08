import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { AuthController } from '../controllers/auth.controller';

const routes = Router()

routes.post('/cadastro', new UserController().create);
routes.post('/login', new AuthController().login)

export default routes