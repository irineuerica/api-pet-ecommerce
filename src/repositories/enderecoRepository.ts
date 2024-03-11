import { AppDataSource } from "../config/db.config"
import { Endereco } from "../entities/Endereco"

export const enderecoRepository = AppDataSource.getRepository(Endereco)