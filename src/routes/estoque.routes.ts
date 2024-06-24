import { Router } from 'express'
import { EstoqueController } from '../controllers/estoque.controller';

const estoqueRoutes = Router()

estoqueRoutes.get('/', new EstoqueController().list);
estoqueRoutes.get('/gruposPrecificacao', new EstoqueController().listGruposPrecificacao);
estoqueRoutes.get('/:id', new EstoqueController().show);
estoqueRoutes.post('/', new EstoqueController().create);
estoqueRoutes.put('/', new EstoqueController().update);

export default estoqueRoutes