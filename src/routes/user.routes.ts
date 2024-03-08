import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

const routes = Router()

routes.get('/', new UserController().list);
routes.get('/:id', new UserController().show);
routes.put('/:id', new UserController().update);
routes.delete('/:id', new UserController().delete);

export default routes