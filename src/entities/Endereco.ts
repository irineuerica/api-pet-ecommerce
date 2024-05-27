import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Usuario } from './Usuario'

@Entity('enderecos')
export class Endereco {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'text' })
	nome: string
	
	@Column({ type: 'text' })
	tpResidencia: string

	@Column({ type: 'text' })
	tpLogradouro: string

	@Column({ type: 'text' })
	logradouro: string

	@Column({ type: 'text' })
	numero: string

	@Column({ type: 'text' })
	bairro: string

	@Column({ type: 'text' })
	cep: string

	@Column({ type: 'text' })
	cidade: string

	@Column({ type: 'text' })
	estado: string

	@Column({ type: 'text' })
	observacao: string

    @Column({ type: 'bool' })
	entrega: boolean

	@Column({ type: 'bool' })
	cobranca: boolean

	@Column({ type: 'date' })
	criado_em: Date

	@Column({ type: 'date' })
	atualizado_em: Date

	@ManyToOne(() => Usuario, usuario => usuario.enderecos)
	@JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
	usuario: Usuario;

}