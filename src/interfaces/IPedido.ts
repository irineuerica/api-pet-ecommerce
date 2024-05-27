import { StatusPedidoEnum } from "../constants/enums/status-pedido.enum";
import { ICartao } from "./ICartao";
import { ICupom } from "./ICupom";
import { IEndereco } from "./IEndereco";
import { IProduto } from "./IProduto";

export interface ItemCarrinhoInterface {
    produto: IProduto;
    quantidade: number;
    tempoCarrinho: number;
    status?: number
}


export type PagamentoInterface = {
    cartoes: ICartao[]
    cupons: ICupom[]
  };


export interface CreatePedido {
    items: ItemCarrinhoInterface[];
    data: Date;
    valor: number;
    status: StatusPedidoEnum;
    frete: number,
    endereco:  IEndereco,
    pagamento: PagamentoInterface,
}