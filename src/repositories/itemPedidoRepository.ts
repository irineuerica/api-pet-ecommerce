import { AppDataSource } from "../config/db.config"
import { ItemPedido } from "../entities/ItemPedido"

export const itemPedidoRepository = AppDataSource.getRepository(ItemPedido)