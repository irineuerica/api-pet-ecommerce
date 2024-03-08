import { BadRequestError } from '../helpers/errors.helper'
import { userRepository } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type Login = {
    email: string; 
    senha: string
}


export class AuthService {
    async login({ email, senha }: Login) {
        const user = await userRepository.findOneBy({ email })
        if (!user) {
            throw new BadRequestError('Usuário inválido');
        }

        const verifyPass = await bcrypt.compare(senha, user.senha)

        if (!verifyPass) {
            throw new BadRequestError('Senha incorreta');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
            expiresIn: '8h',
        })

        const { senha: _, ...userLogin } = user;
        const authUser = { user: userLogin, token }
        return authUser
    }

}