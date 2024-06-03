import { AppDataSource } from "../config/db.config"
import { ItemPedido } from "../entities/ItemPedido"

export const itemPedidoRepository = AppDataSource.getRepository(ItemPedido).extend({
    async analisys(produtoIds: number[], dataInicio: Date, dataFim: Date) {
        const query = this.createQueryBuilder('itens_pedido')
            .select('COUNT(itens_pedido.id)', 'quantidade')
            .addSelect('DATE(pedidos.data)', 'data')
            .addSelect('produtos.nome', 'nome')
            .innerJoin('itens_pedido.pedido', 'pedidos')
            .innerJoin('itens_pedido.produto', 'produtos')
            .where('produtos.id IN (:...produtoIds)', { produtoIds })
            .andWhere('DATE(pedidos.data) BETWEEN DATE(:dataInicio) AND DATE(:dataFim)', { dataInicio, dataFim })
            .groupBy('produtos.nome')
            .addGroupBy('DATE(pedidos.data)')

        return await query.getRawMany();
    },


})