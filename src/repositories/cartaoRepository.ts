import { AppDataSource } from "../config/db.config"
import { Cartao } from "../entities/Cartao"

export const cartaoRepository = AppDataSource.getRepository(Cartao)