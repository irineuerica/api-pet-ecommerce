export interface IUsuario {
    id?: number;
    nome: string;
	genero: string;
	dataNascimento: Date;
	cpf: string;
	ddd: string
	telefone: string
	status: boolean
	email: string
	senha: string
	criado_em: Date
	atualizado_em: Date
}