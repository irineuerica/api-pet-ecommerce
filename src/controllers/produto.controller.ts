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

    async listAll(req: Request, res: Response) {
        const produtoService = new ProdutoService();
        const produtos = await produtoService.list();
        res.json(produtos);
    }


    async listCategorias(req: Request, res: Response) {
        const produtoService = new ProdutoService();
        const categorias = await produtoService.listCategorias();
        res.json(categorias);
    }

    async create(req: Request, res: Response) {
        const {produto} = req.body;
        const produtoService = new ProdutoService();
        const novoProduto = await produtoService.create(produto);
        res.json(novoProduto);
    }

    async update(req: Request, res: Response) {
        const {produto} = req.body;
        const produtoService = new ProdutoService();
        const produtoSalvo = await produtoService.create(produto);
        res.json(produtoSalvo);
    }

}