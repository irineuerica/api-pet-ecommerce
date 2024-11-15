import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/errors.helper'
import { usuarioRepository } from '../repositories/usuarioRepository'
import jwt from 'jsonwebtoken'

type JwtPayload = {
	id: number
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers

	if (!authorization) {
		throw new UnauthorizedError('Não autorizado')
	}

	const token = authorization.split(' ')[1]

	const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

	const user = await usuarioRepository.findOneBy({ id })

	if (!user) {
		throw new UnauthorizedError('Não autorizado')
	}

	const { senha: _, ...loggedUser } = user

	req.user = loggedUser

	next()
}