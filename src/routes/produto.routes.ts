import { Router } from 'express'
import {ProdutoController} from "../controllers/produto.controller";

const produtoRoutes = Router()

produtoRoutes.get('/', new ProdutoController().list);
produtoRoutes.get('/listAll', new ProdutoController().listAll);
produtoRoutes.get('/categoria', new ProdutoController().listCategorias);
produtoRoutes.get('/:id', new ProdutoController().show);
produtoRoutes.post('/', new ProdutoController().create)
produtoRoutes.put('/', new ProdutoController().update)

export default produtoRoutes