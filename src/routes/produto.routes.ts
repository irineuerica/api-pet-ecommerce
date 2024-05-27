import { Router } from 'express'
import {ProdutoController} from "../controllers/produto.controller";

const produtoRoutes = Router()

produtoRoutes.get('/', new ProdutoController().list);


export default produtoRoutes