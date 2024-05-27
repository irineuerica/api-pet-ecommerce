import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinTable} from 'typeorm'
import {StatusPedido} from "./StatusPedido";
import {Endereco} from "./Endereco";
import {Cupom} from "./Cupom";
import {Usuario} from "./Usuario";
import {Cartao} from "./Cartao";

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'date' })
    data: Date

    @Column({ type: 'decimal' })
    valor: number

    @Column({ type: 'decimal' })
    frete: number

    @ManyToOne(() => StatusPedido, { eager: true })
    @JoinColumn({ name: 'status_pedido_id', referencedColumnName: 'id' })
    status: StatusPedido;

    @ManyToOne(() => Endereco, {eager: true})
    @JoinColumn({ name: 'endereco_id', referencedColumnName: 'id' })
    endereco: Endereco;

    @ManyToOne(type => Usuario)
    @JoinColumn({name: 'usuario_id', referencedColumnName: 'id'})
    usuario: Usuario

    @ManyToMany(type => Cupom, { eager: true })
    @JoinTable({
    name: "cupom_pedido",
    joinColumn: {
        name: "pedido_id",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "cupom_id",
        referencedColumnName: "codigo"
    }
    })  
    cupons: Cupom[]


    @ManyToMany(type => Cartao)
    @JoinTable({
    name: "cartao_pedido",
    joinColumn: {
        name: "pedido_id",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "cartao_id",
        referencedColumnName: "id"
    }})
    cartoes: Cartao[]

}