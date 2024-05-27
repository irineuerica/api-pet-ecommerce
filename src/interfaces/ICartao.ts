import { Usuario } from "../entities/Usuario"

export interface ICartao {
    id: number	
	nome: string
	numero: string
	vencimentoMes: string
    vencimentoAno: string
	bandeira: string
	principal: boolean
	criado_em: Date
	atualizado_em: Date
	usuario: Usuario;
	cvv: string;
}