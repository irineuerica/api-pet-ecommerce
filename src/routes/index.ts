import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import authenticationRoutes from './auth.routes'
import userRoutes from './usuario.routes'
import enderecoRoutes from './endereco.routes'
import cartaoRoutes from './cartao.routes'
import produtoRoutes from "./produto.routes";
import cupomRoutes from './cupom.routes'
import pedidoRoutes from './pedido.routes'
import estoqueRoutes from './estoque.routes'

export const routes = Router()


routes.use(authenticationRoutes)
routes.use('/produto', produtoRoutes);


routes.use(authMiddleware)
routes.use('/cupom', cupomRoutes);
routes.use('/user', userRoutes);
routes.use('/endereco', enderecoRoutes);
routes.use('/cartao', cartaoRoutes);
routes.use('/pedido', pedidoRoutes);
routes.use('/estoque', estoqueRoutes)
