import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Categoria} from "./Categoria";
import {Estoque} from "./Estoque";
import { ItemPedido } from './ItemPedido';
import { Precificacao } from './Precificacao';

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

    @Column({ type: 'boolean' })
    status: boolean

    @Column({ type: 'text' })
    motivoAtivacao: string

    @Column({ type: 'text' })
    motivoInativacao: string

    @OneToOne(type=> Estoque, estoque => estoque.produto)
    estoque: Estoque

    @ManyToOne(type => Precificacao, precificacao => precificacao.produtos, { eager: true })
    @JoinColumn({name: 'precificacao_id', referencedColumnName: 'id' })
    precificacao: Precificacao

    @ManyToOne(type => Categoria, categoria => categoria.produtos, { eager: true })
    @JoinColumn({name: 'categoria_id', referencedColumnName: 'id' })
    categoria: Categoria

    @OneToMany(() => ItemPedido, itemPedido => itemPedido.produto)
    itensPedido: ItemPedido[];

}