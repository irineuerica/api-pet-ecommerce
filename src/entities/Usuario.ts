import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Endereco } from './Endereco'
import { Cartao } from './Cartao'

@Entity('usuarios')
export class Usuario {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'text' })
	nome: string
	
	@Column({ type: 'text' })
	genero: string

	@Column({ type: 'date' })
	dataNascimento: Date

	@Column({ type: 'text', unique: true  })
	cpf: string

	@Column({ type: 'text' })
	ddd: string

	@Column({ type: 'text' })
	telefone: string

	@Column({ type: 'bool' })
	status: boolean

	@Column({ type: 'text', unique: true })
	email: string

	@Column({ type: 'text' })
	senha: string

	@Column({ type: 'bool' })
	isAdmin: boolean

	@Column({ type: 'date' })
	criado_em: Date

	@Column({ type: 'date' })
	atualizado_em: Date

	@OneToMany(() => Endereco, endereco => endereco.usuario, { eager: true })
	enderecos: Endereco[];

	@OneToMany(() => Cartao, cartao => cartao.usuario, { eager: true })
	cartoes: Cartao[];
}