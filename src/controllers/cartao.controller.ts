import { Request, Response } from 'express'
import { getAuthorization } from '../helpers/authorization.helper';
import { CartaoService } from '../services/cartao.service';

export class CartaoController {

	async create(req: Request, res: Response) {
		const {id} = getAuthorization(req, res)
		const { cartao } = req.body;
		const cartaoService = new CartaoService();
		const newCard = await cartaoService.create({cartao, id});
		return res.json(newCard)
	}

	async show(req: Request, res: Response) {
		const { id } = req.params;
        const cartaoService = new CartaoService();
		const cartao = await cartaoService.show(Number(id));
		return res.json(cartao)
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params
        const cartaoService = new CartaoService();
		await cartaoService.delete(Number(id))
		return res.status(204).json()
	}

	async update(req: Request, res: Response) {
		const user = getAuthorization(req, res)
		const { cartao } = req.body;
		const { id } = req.params
        const cartaoService = new CartaoService();
		const cartaoAtualizado = await cartaoService.update({ cartao, id: Number(id), userId: user.id})
		return res.json(cartaoAtualizado)

	}

	async list(req: Request, res: Response) {
		const {id} = getAuthorization(req, res)
        const cartaoService = new CartaoService();
		const cartoes = await cartaoService.list(id);
		res.json(cartoes);
	}

}