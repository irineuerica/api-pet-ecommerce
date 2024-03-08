import { AppDataSource } from "../config/db.config"
import { User } from '../entities/User'

export const userRepository = AppDataSource.getRepository(User)