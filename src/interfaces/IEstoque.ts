import { Precificacao } from "../entities/Precificacao";
import { Produto } from "../entities/Produto";

export interface IEstoque {
    id: number;
    quantidadeAtual: number;
    quantidadeVendida: number;
    fornecedor: string;
    dataEntrada?: Date;
    dataSaida?: Date;
}

export interface EstoqueFormInterface {
    id: number;
    quantidade: number;
    data: Date;
    fornecedor: string;
    produto: number;
    precificacao: number;
    custo: number;
    operacao?: 'ENTRADA' | 'SAIDA'
  }
  