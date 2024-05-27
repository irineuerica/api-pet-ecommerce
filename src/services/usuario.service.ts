import { BadRequestError, NotFoundError } from '../helpers/errors.helper'
import { IUsuario } from '../interfaces/IUsuario'
import { usuarioRepository } from '../repositories/usuarioRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type UpdateUserProps = {
    usuario: IUsuario
    id: number
}


export class UserService {
    async create( usuario : IUsuario) {
        const userExists = await usuarioRepository.findOneBy({ email: usuario.email })

        if (userExists) {
            throw new BadRequestError('E-mail já cadastrado')
        }

        const hashPassword = await bcrypt.hash(usuario.senha, 10)
        const newUser = usuarioRepository.create({...usuario, senha: hashPassword, dataNascimento: new Date(usuario.dataNascimento)})
        await usuarioRepository.save(newUser)

        const { senha: _, ...user } = newUser

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
            expiresIn: '8h',
        })

        const authUser = { user: newUser, token }
        
        return authUser
    }

    async show(id: Number) {
        const user = await usuarioRepository.findOneBy({ id: Number(id) })

        if (!user) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const { senha: _, ...userResult } = user;
        
        return userResult;
    }

    async alterarStatus(status: boolean, id: number) {
        const user = await usuarioRepository.findOneBy({ id: Number(id) })

        if (!user) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const newValue = {...user, status}

        await usuarioRepository.update(id, newValue)
    }

    async alterarSenha(senha: string, id: number) {
        const user = await usuarioRepository.findOneBy({ id: Number(id) })

        if (!user) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const hashPassword = await bcrypt.hash(senha, 10)
        const newUser = usuarioRepository.create({...user, senha: hashPassword})

        await usuarioRepository.update(id, newUser)
    }


    async update({ usuario, id }: UpdateUserProps) {
    
        const user = await usuarioRepository.findOneBy({ id: Number(id) })

        if (!user) {
            throw new NotFoundError('Usuário não encontrado')
        }
        const formattedUser = {...usuario, dataNascimento: new Date(usuario.dataNascimento)}
        await usuarioRepository.update(id, formattedUser);
        return formattedUser
    }


    async list() : Promise<any[]> {
        const users = await usuarioRepository.find();
        return users.map((user) => {
            const { senha: _, ...userResult } = user;
            return userResult;
        })
    }

    async setAsAdmin(id: number) {
        const user = await usuarioRepository.findOneBy({id})

        if (!user) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const newValue = {...user, isAdmin: true}
        return await usuarioRepository.update(id, newValue)
    }

}