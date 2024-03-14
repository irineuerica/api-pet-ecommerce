import { Router } from 'express'
import { CartaoController } from '../controllers/cartao.controller';

const cartaoRoutes = Router()

cartaoRoutes.post('/', new CartaoController().create);
cartaoRoutes.get('/', new CartaoController().list);
cartaoRoutes.get('/:id', new CartaoController().show);
cartaoRoutes.put('/:id', new CartaoController().update);
cartaoRoutes.delete('/:id', new CartaoController().delete);

export default cartaoRoutes