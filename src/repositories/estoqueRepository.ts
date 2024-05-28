import { AppDataSource } from "../config/db.config"
import { Estoque } from "../entities/Estoque"

export const estoqueRepository = AppDataSource.getRepository(Estoque)