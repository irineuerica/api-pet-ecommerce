import { AppDataSource } from "../config/db.config"
import { Usuario } from '../entities/Usuario'

export const userRepository = AppDataSource.getRepository(Usuario)