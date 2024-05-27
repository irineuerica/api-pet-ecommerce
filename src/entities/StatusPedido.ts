import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Pedido} from "./Pedido";

@Entity('status_pedido')
export class StatusPedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    nome: string

    @OneToMany(() => Pedido, pedido => pedido.status)
    pedidos: Pedido[];
}