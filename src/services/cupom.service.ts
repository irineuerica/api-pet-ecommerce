import {NotFoundError} from '../helpers/errors.helper'
import { Cupom } from '../entities/Cupom';
import { cupomRepository } from '../repositories/cupomRespository';

interface CupomList extends Cupom{
    status: string;
}

export class CupomService {

    async create(cupom: Cupom){
        cupomRepository.save(cupom)
    }

    async list(): Promise<Cupom[]> {
        return await cupomRepository.find()
    }

    async listByUser(usuarioId: number): Promise<Cupom[]|null> {
        const cupons = await cupomRepository.findCouponsByUsuarioId(usuarioId)
        console.log("cupons>>", cupons )
        return cupons
    }
}