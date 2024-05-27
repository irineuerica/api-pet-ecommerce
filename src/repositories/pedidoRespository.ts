import { AppDataSource } from "../config/db.config"
import { Pedido } from "../entities/Pedido"

export const pedidoRepository = AppDataSource.getRepository(Pedido)