import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Produto} from "./Produto";

@Entity('precificacoes')
export class Precificacao {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    nome: string

    @Column({ type: 'decimal' })
    porcentagem: number

    @Column({ type: 'date' })
    criado_em: Date

    @Column({ type: 'date' })
    atualizado_em: Date

    @OneToOne(type => Produto,)
    produto: Produto;

}