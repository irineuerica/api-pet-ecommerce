import {NotFoundError} from '../helpers/errors.helper'
import {produtoRepository} from "../repositories/produtoRepository";
import {Produto} from "../entities/Produto";
import { MoreThan } from 'typeorm';

export class ProdutoService {
    async show(id: Number) {
        const produto = await produtoRepository.findOneBy({ id: Number(id) })

        if (!produto) {
            throw new NotFoundError('Produto não encontrado')
        }
        return produto
    }



    async list(): Promise<Produto[]> {
        return await produtoRepository.find({relations: ['estoque', 'categoria']})
    }

    async listActive(): Promise<Produto[]> {
        return await produtoRepository.find({relations: ['estoque', 'categoria'], where: {estoque: {quantidadeAtual: MoreThan(0)}}})
    }
}