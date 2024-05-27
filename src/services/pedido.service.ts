import { CreatePedido } from '../interfaces/IPedido';
import { cupomRepository } from '../repositories/cupomRespository';
import { pedidoRepository } from '../repositories/pedidoRespository';
import { usuarioRepository } from '../repositories/usuarioRepository';

interface createPedidoProps  {
    pedido: CreatePedido
    id: number
}


export class PedidoService {
    async create({pedido, id}: createPedidoProps) {
        const user = await usuarioRepository.findBy({id})
        const novoPedido = pedidoRepository.create({
            data: new Date(),
            valor: pedido.valor,
            endereco: pedido.endereco,
            frete: pedido.frete,
            usuario: user[0],
            cartoes: pedido.pagamento?.cartoes,
            cupons: pedido.pagamento?.cupons,
            status: {id: pedido.status}
        })
    
        const pedidoSalvo = await pedidoRepository.save(novoPedido)
    
        if(pedido.valor < 0){
            const referralCodes = require('referral-codes');
            const codigo = referralCodes.generate({
                prefix: 'TROCO-',
                postfix: '-2024',
            })
            const cupom = {
                codigo: codigo[0],
                valor: pedido.valor * -1,
                tipo: 'Troco',
                pedidoOrigem: pedidoSalvo,
                usuario: user[0]
            }
            await cupomRepository.save(cupom)
        }
       
        
        return pedidoSalvo;
    }

}