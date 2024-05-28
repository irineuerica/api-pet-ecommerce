import { Cupom } from '../entities/Cupom';
import { cupomRepository } from '../repositories/cupomRespository';


export class CupomService {

    async create(cupom: Cupom){
        cupomRepository.save(cupom)
    }

    async list(): Promise<Cupom[]> {
        return await cupomRepository.findAll()  
    }

    async listByUser(usuarioId: number): Promise<Cupom[]|null> {
        const cupons = await cupomRepository.findCouponsByUsuarioId(usuarioId)
        return cupons
    }
}