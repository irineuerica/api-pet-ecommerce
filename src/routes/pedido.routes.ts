import { Router } from 'express'
import { PedidoController } from '../controllers/pedido.controller';

const pedidoRoutes = Router()

pedidoRoutes.post('/', new PedidoController().create);
pedidoRoutes.post('/status', new PedidoController().updateStatus);
pedidoRoutes.post('/status/item', new PedidoController().updateStatusItem);
pedidoRoutes.post('/analise', new PedidoController().analysis);
pedidoRoutes.post('/troca-devolucao', new PedidoController().updateStatusGenerateCupom);
pedidoRoutes.get('/', new PedidoController().listByUser);
pedidoRoutes.get('/all', new PedidoController().listAll);
pedidoRoutes.get('/show/:id', new PedidoController().showPedido);
pedidoRoutes.get('/status', new PedidoController().listStatus);


export default pedidoRoutes