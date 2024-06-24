import { Request, Response } from 'express'
import {ProdutoService} from "../services/produto.service";
import { EstoqueService } from '../services/estoque.service';

export class EstoqueController {

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const estoqueService = new EstoqueService();
        const estoque = await estoqueService.show(Number(id));
        return res.json(estoque)
    }

    async list(req: Request, res: Response) {
        const estoqueService = new EstoqueService();
        const estoque = await estoqueService.list();
        res.json(estoque);
    }


    async listGruposPrecificacao(req: Request, res: Response) {
        const estoqueService = new EstoqueService();
        const grupos = await estoqueService.listGruposPrecificacao();
        res.json(grupos);
    }

    async create(req: Request, res: Response) {
        const {estoque} = req.body;
        const estoqueService = new EstoqueService();
        const novoEstoque = await estoqueService.create(estoque);
        res.json(novoEstoque);
    }

    async update(req: Request, res: Response) {
        const {estoque} = req.body;
        const estoqueService = new EstoqueService();
        const novoEstoque = await estoqueService.update(estoque);
        res.json(novoEstoque);
    }

}