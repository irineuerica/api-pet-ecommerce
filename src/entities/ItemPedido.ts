import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable, OneToMany, PrimaryColumn} from 'typeorm'
import {StatusPedido} from "./StatusPedido";
import { Produto } from './Produto';
import { Pedido } from './Pedido';

@Entity('itens_pedido')
export class ItemPedido {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Produto, produto => produto.itensPedido, { eager: true })
    @JoinColumn({ name: 'produto_id', referencedColumnName: 'id' })
    produto: Produto;

    @ManyToOne(() => Pedido, pedido => pedido.itensPedido)
    @JoinColumn({ name: 'pedido_id', referencedColumnName: 'id' })
    pedido: Pedido;

    @ManyToOne(() => StatusPedido, { eager: true })
    @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
    status: StatusPedido;
}