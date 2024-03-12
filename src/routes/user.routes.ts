import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

const routes = Router()

routes.get('/', new UserController().list);
routes.get('/:id', new UserController().show);
routes.put('/:id', new UserController().update);
routes.put('/status/:id', new UserController().changeStatus);
routes.put('/admin/:id', new UserController().setAsAdmin);

export default routes