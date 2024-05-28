import { AppDataSource } from "../config/db.config"
import { Cupom } from "../entities/Cupom"


export const cupomRepository = AppDataSource.getRepository(Cupom).extend({
  async findCouponsByUsuarioId(usuarioId: number) {
    const query = this.createQueryBuilder('cupons')
      .select([
        'cupons.codigo as codigo',
        'cupons.valor as valor',
        'cupons.tipo as tipo',
        'cupons.pedido_origem_id as pedidoId',
        `IF(cupom_pedido.pedido_id IS NOT NULL, 'Utilizado', 'Disponível') as status`,
      ])
      .leftJoin('cupom_pedido', 'cupom_pedido', 'cupom_pedido.cupom_id = cupons.codigo')
      .where('cupons.usuario_id = :usuarioId', { usuarioId: Number(usuarioId) })

    return await query.getRawMany();
  },
  async findAll() {
    const query = this.createQueryBuilder('cupons')
      .select([
        'cupons.codigo as codigo',
        'cupons.valor as valor',
        'cupons.tipo as tipo',
        'cupons.pedido_origem_id as pedidoId',
        `IF(cupom_pedido.pedido_id IS NOT NULL, 'Utilizado', 'Disponível') as status`,
      ])
      .leftJoin('cupom_pedido', 'cupom_pedido', 'cupom_pedido.cupom_id = cupons.codigo')

    return await query.getRawMany();
  },

})
