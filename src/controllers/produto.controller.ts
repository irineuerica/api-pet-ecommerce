import { Request, Response } from 'express'
import {ProdutoService} from "../services/produto.service";

export class ProdutoController {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const produtoService = new ProdutoService();
        const produto = await produtoService.show(Number(id));
        return res.json(produto)
    }

    async list(req: Request, res: Response) {
        const produtoService = new ProdutoService();
        const produtos = await produtoService.listActive();
        res.json(produtos);
    }

    async listCategorias(req: Request, res: Response) {
        const produtoService = new ProdutoService();
        const categorias = await produtoService.listCategorias();
        res.json(categorias);
    }

}