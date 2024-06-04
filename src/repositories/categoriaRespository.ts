import { AppDataSource } from "../config/db.config"
import { Categoria } from "../entities/Categoria"

export const categoriaRepository = AppDataSource.getRepository(Categoria)