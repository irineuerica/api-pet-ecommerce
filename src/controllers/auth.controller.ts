import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service';

export class AuthController {

	async login(req: Request, res: Response) {
		const { email, senha } = req.body
		const authService = new AuthService();
		const authUser = await authService.login({ email, senha })
		return res.json({
			usuario: authUser?.user,
			token: authUser?.token,
		})

	}
}