import { User } from "../entities/User"

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
	usuario: User;
}