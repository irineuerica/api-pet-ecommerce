import { Router } from 'express'
import { UsuarioController } from '../controllers/usuario.controller'
import { AuthController } from '../controllers/auth.controller';

const routes = Router()

routes.post('/cadastro', new UsuarioController().create);
routes.post('/login', new AuthController().login)

export default routes