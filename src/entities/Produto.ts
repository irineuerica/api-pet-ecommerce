import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Categoria} from "./Categoria";
import {Estoque} from "./Estoque";
import { ItemPedido } from './ItemPedido';

@Entity('produtos')
export class Produto {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    nome: string

    @Column({ type: 'text' })
    descricao: string

    @Column({ type: 'decimal' })
    valor: number

    @OneToOne(type=> Estoque, estoque => estoque.produto)
    estoque: Estoque

    @ManyToOne(type => Categoria, categoria => categoria.produtos, { eager: true })
    @JoinColumn({name: 'categoria_id', referencedColumnName: 'id' })
    categoria: Categoria

    @OneToMany(() => ItemPedido, itemPedido => itemPedido.produto)
    itensPedido: ItemPedido[];
}