import { StatusPedidoEnum } from '../constants/enums/status-pedido.enum';
import { ItemPedido } from '../entities/ItemPedido';
import { StatusPedido } from '../entities/StatusPedido';
import { CreatePedido } from '../interfaces/IPedido';
import { cupomRepository } from '../repositories/cupomRespository';
import { estoqueRepository } from '../repositories/estoqueRepository';
import { itemPedidoRepository } from '../repositories/itemPedidoRepository';
import { pedidoRepository } from '../repositories/pedidoRespository';
import { produtoRepository } from '../repositories/produtoRepository';
import { statusPedidoRepository } from '../repositories/statusPedidoRepository';
import { usuarioRepository } from '../repositories/usuarioRepository';

interface CreatePedidoProps {
    pedido: CreatePedido
    id: number
}

interface UpdateStatusProps {
    id: number
    status: StatusPedido
}

interface UpdateStatusItemProps {
    itemPedidoId: number
    status: StatusPedido
}

interface listByUser {
    userId: number
}

interface showProps {
    pedidoId: number
}


interface AnalysisProps {
    produtosId: number[],
    dataInicio: Date,
    dataFim: Date
}


interface TrocaDevolucaoProps {
    itemPedidoId: number
    status: StatusPedido,
    devolverEstoque: boolean
}

export class PedidoService {
    async create({ pedido, id }: CreatePedidoProps) {
        const user = await usuarioRepository.findBy({ id })
        const novoPedido = pedidoRepository.create({
            data: new Date(),
            valor:  pedido.subtotal + pedido.frete,
            endereco: pedido.endereco,
            frete: pedido.frete,
            usuario: user[0],
            cartoes: pedido.pagamento?.cartoes,
            cupons: pedido.pagamento?.cupons,
            status: { id: pedido.status }
        })

        const pedidoSalvo = await pedidoRepository.save(novoPedido)
        for (const item of pedido.items) {
            const produto = await produtoRepository.findOneBy({ id: item.produto.id });

            if (!produto) {
                throw new Error(`Produto não encontrado.`);
            }

            for (let index = 0; index < item.quantidade; index++) {
                const novoItemPedido = new ItemPedido();
                novoItemPedido.produto = produto;
                novoItemPedido.pedido = pedidoSalvo;
                novoItemPedido.status = { id: StatusPedidoEnum.EM_PROCESSAMENTO, nome: 'Em processamento' }

                await itemPedidoRepository.save(novoItemPedido);
            }

            //Atualiza estoque
            let estoqueAtual = await estoqueRepository.findOneBy({ id: item.produto.estoque.id })
            if (!estoqueAtual) {
                throw new Error(`Estoque não encontrado.`);
            }
            estoqueAtual.quantidadeAtual -= item.quantidade;
            estoqueAtual.quantidadeVendida += item.quantidade;
            estoqueAtual.dataSaida = new Date();
            await estoqueRepository.save(estoqueAtual)
        }



        if (pedido.valor < 0) {
            const codigo = `TROCO-${pedidoSalvo.id}-2024`
            const cupom = {
                codigo: codigo,
                valor: pedido.valor * -1,
                tipo: 'Troco',
                pedidoOrigem: pedidoSalvo,
                usuario: user[0]
            }
            await cupomRepository.save(cupom)
        }


        return pedidoSalvo;
    }

    async updateStatusPedido({ id, status }: UpdateStatusProps) {
        const pedido = await pedidoRepository.findOneBy({ id })
        if (!pedido) {
            throw new Error(`Pedido não encontrado.`);
        }
        pedido.status = status

        const pedidoSalvo = await pedidoRepository.save(pedido)

        const itensPedido = await itemPedidoRepository.find({ where: { pedido: { id: id } } });
        if (!itensPedido) {
            throw new Error(`Item pedido não encontrado.`);
        }
        for (const item of itensPedido) {
            item.status = status
            await itemPedidoRepository.save(item)
        }

        return pedidoSalvo;
    }

    async updateStatusItem({ itemPedidoId, status }: UpdateStatusItemProps) {
        const itemPedido = await itemPedidoRepository.findOne({ where: { id: itemPedidoId }, relations: ['pedido'] });
        if (!itemPedido) {
            throw new Error(`Item pedido não encontrado.`);
        }
        const pedido = await pedidoRepository.findOne({ where: { id: itemPedido.pedido.id } })
        if (!pedido) {
            throw new Error(`Pedido não encontrado.`);
        }
        pedido.status = status
        itemPedido.status = status
        const itemPedidoAtualizado = await itemPedidoRepository.save(itemPedido)
        await pedidoRepository.save(pedido)
        return itemPedidoAtualizado;
    }


    async show({ pedidoId }: showProps) {
        return await pedidoRepository.findOneBy({ id: pedidoId })
    }


    async listByUser({ userId }: listByUser) {
        const user = await usuarioRepository.findOneBy({ id: userId })
        if (!user) {
            throw new Error(`Usuário não encontrado.`);
        }
        const pedidos = await pedidoRepository.find({ where: { usuario: { id: userId } } })
        return pedidos
    }

    async listAll() {
        return await pedidoRepository.find()
    }

    async listStatus() {
        return await statusPedidoRepository.find()
    }

    async updateStatusGenerateCupom({ itemPedidoId, status, devolverEstoque }: TrocaDevolucaoProps) {
        const itemPedido = await this.updateStatusItem({ itemPedidoId, status });
        const cupom = {
            codigo: `TROCA-${itemPedido.id}-2024`,
            valor: itemPedido.produto?.valor,
            tipo: 'Troca',
            pedidoOrigem: itemPedido.pedido.id,
            usuario: itemPedido.pedido?.usuario
        }

        //@ts-ignore
        await cupomRepository.save(cupom)

        if(!devolverEstoque)
            return

        const estoqueProduto = await estoqueRepository.findOneBy({produto: {id: itemPedido.produto.id}})
        if(!estoqueProduto){
            throw new Error(`Estoque não encontrado.`);
        }
        estoqueProduto.quantidadeAtual += 1;
        estoqueProduto.quantidadeVendida -=1 ;

        await estoqueRepository.save(estoqueProduto)   
       
    }

    async analysis({produtosId, dataInicio, dataFim}: AnalysisProps) {
        return await itemPedidoRepository.analisys(produtosId, dataInicio, dataFim)
    }
}