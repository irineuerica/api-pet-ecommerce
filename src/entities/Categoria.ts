import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Produto} from "./Produto";

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    nome: string

    @OneToMany(() => Produto, produto => produto.categoria)
    produtos: Produto[];

}