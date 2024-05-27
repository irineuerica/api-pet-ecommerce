import { Request, Response } from 'express'
import { CupomService } from '../services/cupom.service';
import { getAuthorization } from '../helpers/authorization.helper';
import { PedidoService } from '../services/pedido.service';

export class PedidoController {

    async create(req: Request, res: Response) {
        const {id} = getAuthorization(req, res)
        const { pedido } = req.body;
        const pedidoService = new PedidoService()
        const novoPedido = await pedidoService.create({pedido, id})
        return res.json(novoPedido)
    }

  


}