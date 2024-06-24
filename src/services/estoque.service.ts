import {NotFoundError} from '../helpers/errors.helper'
import {produtoRepository} from "../repositories/produtoRepository";
import { estoqueRepository } from '../repositories/estoqueRepository';
import { Estoque } from '../entities/Estoque';
import { Precificacao } from '../entities/Precificacao';
import { precificacaoRepository } from '../repositories/precificacaoRespository';
import { EstoqueFormInterface } from '../interfaces/IEstoque';

export class EstoqueService {
    async show(id: Number) {
        const estoque = await estoqueRepository.findOneBy({ id: Number(id) })

        if (!estoque) {
            throw new NotFoundError('Estoque não encontrado')
        }
        return estoque
    }

    async create(estoque: EstoqueFormInterface) {
        const produto = await produtoRepository.findOne({relations: ['categoria'], where: {id: estoque.produto}})
        console.log(produto)
        if(!produto){
            throw new Error('Produto não encontrado')
        }
        const estoqueAtual = await estoqueRepository.findOneBy({produto:{id: produto.id}})
        if(estoqueAtual){
            throw new Error('Estoque do produto já existe')
        }
        const precificao = await precificacaoRepository.findOneBy({id: estoque.precificacao})
        if(!precificao){
            throw new Error('Grupo de precificação não encontrado')
        }
        produto.valor = (precificao.porcentagem / 100) * estoque.custo + estoque.custo;

        const novoEstoque = new Estoque();
        novoEstoque.produto = produto;
        novoEstoque.quantidadeAtual = estoque.quantidade;
        novoEstoque.dataEntrada = new Date(estoque.data)
        novoEstoque.fornecedor = estoque.fornecedor;
        novoEstoque.custo = estoque.custo
        await produtoRepository.save(produto)
        await estoqueRepository.save(novoEstoque)
    }

    async update(estoque: EstoqueFormInterface) {
        const produto = await produtoRepository.findOneBy({id: estoque.produto})
        if(!produto){
            throw new Error('Produto não encontrado')
        }
        const precificao = await precificacaoRepository.findOneBy({id: estoque.precificacao})
        if(!precificao){
            throw new Error('Grupo de precificação não encontrado')
        }
        const estoqueAtual =  await estoqueRepository.findOneBy({id: estoque.id})
        if(!estoqueAtual){
            throw new Error('Estoque não encontrado')
        }
        estoqueAtual.fornecedor = estoque.fornecedor;
        estoqueAtual.custo = estoque.custo
        if(estoque.operacao && estoque.operacao === 'SAIDA'){
            estoqueAtual.dataSaida = new Date(estoque.data)
            estoqueAtual.quantidadeAtual -= Number(estoque.quantidade);
        }else {
            estoqueAtual.dataEntrada = new Date(estoque.data)
            estoqueAtual.quantidadeAtual += Number(estoque.quantidade);
            produto.valor = (precificao.porcentagem / 100) * Number(estoque.custo) + Number(estoque.custo);
            await produtoRepository.save(produto)
        }
        await estoqueRepository.save(estoqueAtual)
    }

    async list(): Promise<Estoque[]> {
        return await estoqueRepository.find({relations: ['produto']})
    }

    async listGruposPrecificacao(): Promise<Precificacao[]> {
        return await precificacaoRepository.find()
    }
    

}