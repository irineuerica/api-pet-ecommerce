import { IUsuario } from "./IUsuario";

export interface IEndereco {
    id: number;
    nome: string;
    tpResidencia: string;
    tpLogradouro: string;
    logradouro: string
    numero: string
    bairro: string
    cep: string
    cidade: string
    estado: string
    observacao: string
    entrega: boolean
    cobranca: boolean
    criado_em: Date
    atualizado_em: Date
    usuario: IUsuario
}