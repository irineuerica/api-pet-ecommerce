import {AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Pedido} from "./Pedido";
import { Usuario } from './Usuario';

@Entity('cupons')
export class Cupom {
    @PrimaryGeneratedColumn()
    codigo: string

    @Column({ type: 'text' })
    tipo: string

    @Column({ type: 'decimal' })
    valor: number

    @OneToOne(type => Pedido, { eager: true })
    @JoinColumn({ name: 'pedido_origem_id', referencedColumnName: 'id' })
    pedidorigem?: Pedido

    @ManyToOne(type => Usuario)
    @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
    usuario?: Usuario
}