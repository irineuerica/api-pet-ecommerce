import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Usuario } from './Usuario'

@Entity('cartoes')
export class Cartao {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'text' })
	nome: string
	
	@Column({ type: 'text' })
	numero: string

	@Column({ type: 'text' })
	vencimento_mes: string

	@Column({ type: 'text' })
	vencimento_ano: string

	@Column({ type: 'text' })
	bandeira: string

	@Column({ type: 'text' })
	cvv: string

    @Column({ type: 'bool' })
	principal: boolean

	@Column({ type: 'date' })
	criado_em: Date

	@Column({ type: 'date' })
	atualizado_em: Date

	@ManyToOne(() => Usuario, usuario => usuario.cartoes)
	@JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
	usuario: Usuario;

}