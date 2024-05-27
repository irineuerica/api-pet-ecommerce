import { AppDataSource } from "../config/db.config"
import { Usuario } from '../entities/Usuario'

export const usuarioRepository = AppDataSource.getRepository(Usuario)