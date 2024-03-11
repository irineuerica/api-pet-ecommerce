import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import authenticationRoutes from './auth.routes'
import userRoutes from './user.routes'
import enderecoRoutes from './endereco.routes'

export const routes = Router()

routes.use(authenticationRoutes)

routes.use(authMiddleware)

routes.use('/user', userRoutes);
routes.use('/endereco', enderecoRoutes);


