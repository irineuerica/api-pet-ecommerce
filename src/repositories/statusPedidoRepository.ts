import { AppDataSource } from "../config/db.config"
import { StatusPedido } from "../entities/StatusPedido"

export const statusPedidoRepository = AppDataSource.getRepository(StatusPedido)