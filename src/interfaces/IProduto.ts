import { ICategoria } from "./ICategoria";
import { IEstoque } from "./IEstoque";

export interface IProduto {
    id?: number,
    nome: string,
    descricao: string,
    valor: number,
    categoria: ICategoria,
    imagem?: string,
    estoque: IEstoque;
}