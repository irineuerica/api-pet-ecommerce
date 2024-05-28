import { Request, Response } from 'express'
import { CupomService } from '../services/cupom.service';
import { getAuthorization } from '../helpers/authorization.helper';

export class CupomController {

    async create(req: Request, res: Response) {
        const { cupom } = req.body;
        const cupomService = new CupomService()
        const novoCupom = await cupomService.create(cupom);
        return res.json(novoCupom)
    }

    async listAll(req: Request, res: Response) 
    {
        const cupomService = new CupomService()
        const cupons = await cupomService.list()
        res.json(cupons);
    }

    async listByUser(req: Request, res: Response) {
        const {id} = getAuthorization(req, res)
        const cupomService = new CupomService()
        const cupons = await cupomService.listByUser(id)
        res.json(cupons);
    }


}