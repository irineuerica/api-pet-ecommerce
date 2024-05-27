import { Router } from 'express'
import { UsuarioController } from '../controllers/usuario.controller'

const routes = Router()

routes.get('/', new UsuarioController().list);
routes.get('/:id', new UsuarioController().show);
routes.put('/:id', new UsuarioController().update);
routes.put('/status/:id', new UsuarioController().alterarStatus);
routes.put('/admin/:id', new UsuarioController().setAsAdmin);
routes.put('/alterar-senha/:id', new UsuarioController().alterarSenha);

export default routes