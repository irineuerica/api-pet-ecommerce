import { Request, Response } from 'express'
import { UsuarioService } from '../services/usuario.service'

export class UsuarioController {

	async create(req: Request, res: Response) {
		const { usuario } = req.body;
		const userService = new UsuarioService();
		const user = await userService.create(usuario);

		return res.json({
			usuario: user?.user,
			token: user?.token,
		})
	}

	async show(req: Request, res: Response) {
		const { id } = req.params;
		const userService = new UsuarioService();
		const user = await userService.show(Number(id));
		return res.json(user)
	}

	async alterarStatus(req: Request, res: Response) {
		const { id } = req.params
		const { status } = req.body;
		const userService = new UsuarioService();
		await userService.alterarStatus(status, Number(id))
		return res.status(204).json()
	}

	
	async alterarSenha(req: Request, res: Response) {
		const { id } = req.params
		const { senha } = req.body;
		const userService = new UsuarioService();
		await userService.alterarSenha(senha, Number(id))
		return res.status(204).json()
	}

	async update(req: Request, res: Response) {
		const { usuario } = req.body;
		const { id } = req.params
		const userService = new UsuarioService();
		const user = await userService.update({ usuario, id: Number(id) })
		return res.json(user)

	}

	async list(req: Request, res: Response) {
		const userService = new UsuarioService();
		const users = await userService.list();
		res.json(users);
	}

	async setAsAdmin(req: Request, res: Response) {
		const { id } = req.params
		const userService = new UsuarioService();
		const user = await userService.setAsAdmin(Number(id));

		return res.json(user)
	}

	async change(req: Request, res: Response) {
		const { id } = req.params
		const userService = new UsuarioService();
		const user = await userService.setAsAdmin(Number(id));

		return res.json(user)
	}


}