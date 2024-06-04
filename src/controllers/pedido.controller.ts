import { Request, Response } from 'express'
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

    async updateStatus(req: Request, res: Response) {
        const { status, id } = req.body;
        const pedidoService = new PedidoService()
        const novoPedido = await pedidoService.updateStatusPedido({id, status})
        return res.json(novoPedido)
    }

    async updateStatusItem(req: Request, res: Response) {
        const { status, id } = req.body;
        const pedidoService = new PedidoService()
        const novoPedido = await pedidoService.updateStatusItem({itemPedidoId: id, status})
        return res.json(novoPedido)
    }

    async showPedido(req: Request, res: Response) {
        const {id} = req.params
        const pedidoService = new PedidoService()
        const pedidos = await pedidoService.show({pedidoId: Number(id)})
        return res.json(pedidos)
    }

    async listByUser(req: Request, res: Response) {
        const {id} = getAuthorization(req, res)
        const pedidoService = new PedidoService()
        const pedidos = await pedidoService.listByUser({userId: id})
        return res.json(pedidos)
    }

    async listAll(req: Request, res: Response) {
        const pedidoService = new PedidoService()
        const pedidos = await pedidoService.listAll()
        return res.json(pedidos)
    }

    async listStatus(req: Request, res: Response) {
        const pedidoService = new PedidoService()
        const status = await pedidoService.listStatus()
        return res.json(status)
    }

    async updateStatusGenerateCupom(req: Request, res: Response) {
        const { status, id, devolverEstoque } = req.body;
        const pedidoService = new PedidoService()
        const pedido = await pedidoService.updateStatusGenerateCupom({status, itemPedidoId: id, devolverEstoque})
        return res.json(pedido)
    }

    async analysis(req: Request, res: Response) {
        const { produtosId, dataInicio, dataFim } = req.body;
        const pedidoService = new PedidoService()
        const pedido = await pedidoService.analysis({produtosId, dataInicio, dataFim })
        return res.json(pedido)
    }

}