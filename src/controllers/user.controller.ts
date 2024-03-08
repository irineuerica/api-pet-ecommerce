import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {

	async create(req: Request, res: Response) {
		const { usuario } = req.body;
		const userService = new UserService();
		const user = await userService.create(usuario);

		return res.json({
			usuario: user?.user,
			token: user?.token,
		})
	}

	async show(req: Request, res: Response) {
		const { id } = req.params;
		const userService = new UserService();
		const user = await userService.show(Number(id));
		return res.json(user)
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params
		const userService = new UserService();
		await userService.delete(Number(id))
		return res.status(204).json()
	}

	async update(req: Request, res: Response) {
		const { usuario } = req.body;
		const { id } = req.params
		const userService = new UserService();
		const user = await userService.update({ usuario, id: Number(id) })
		return res.json(user)

	}

	async list(req: Request, res: Response) {
		const userService = new UserService();
		const users = await userService.list();
		res.json(users);
	}

}