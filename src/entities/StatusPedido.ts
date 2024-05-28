import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity('status_pedido')
export class StatusPedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    nome: string
}