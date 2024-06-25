import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Produto} from "./Produto";


@Entity('estoques')
export class Estoque {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'integer' })
    quantidadeAtual: number

    @Column({ type: 'integer' })
    quantidadeVendida: number

    @Column({ type: 'text' })
    fornecedor: string

    @Column({ type: 'decimal' })
    custo: number

    @Column({ type: 'date' })
    dataEntrada: Date

    @Column({ type: 'date' })
    dataSaida: Date

    @Column({ type: 'date' })
    criado_em: Date

    @Column({ type: 'date' })
    atualizado_em: Date

   @OneToOne(type=> Produto, produto => produto.estoque)
   @JoinColumn({name: 'produto_id', referencedColumnName: 'id' })
   produto: Produto
}