import { Request, Response } from 'express'
import { EnderecoService } from '../services/endereco.service';

export class EnderecoController {

	async create(req: Request, res: Response) {
		const { endereco } = req.body;
		const enderecoService = new EnderecoService();
		return await enderecoService.create(endereco);
	}

	async show(req: Request, res: Response) {
		const { id } = req.params;
        const enderecoService = new EnderecoService();
		const endereco = await enderecoService.show(Number(id));
		return res.json(endereco)
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params
		const enderecoService = new EnderecoService();
		await enderecoService.delete(Number(id))
		return res.status(204).json()
	}

	async update(req: Request, res: Response) {
		const { endereco } = req.body;
		const { id } = req.params
		const enderecoService = new EnderecoService();
		const enderecoAtualizado = await enderecoService.update({ endereco, id: Number(id) })
		return res.json(enderecoAtualizado)

	}

	async list(req: Request, res: Response) {
		const enderecoService = new EnderecoService();
		const enderecos = await enderecoService.list();
		res.json(enderecos);
	}

}