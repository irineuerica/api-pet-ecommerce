import { AppDataSource } from "../config/db.config"
import { Precificacao } from "../entities/Precificacao"

export const precificacaoRepository = AppDataSource.getRepository(Precificacao)