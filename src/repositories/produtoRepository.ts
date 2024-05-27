import { AppDataSource } from "../config/db.config"
import {Produto} from "../entities/Produto";


export const produtoRepository = AppDataSource.getRepository(Produto)