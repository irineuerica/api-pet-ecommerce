import { Router } from 'express'
import { PedidoController } from '../controllers/pedido.controller';

const pedidoRoutes = Router()

pedidoRoutes.post('/', new PedidoController().create);


export default pedidoRoutes