import { BadRequestError, NotFoundError } from '../helpers/errors.helper'
import { IUsuario } from '../interfaces/IUsuario'
import { userRepository } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type UpdateUserProps = {
    usuario: IUsuario
    id: number
}


export class UserService {
    async create( usuario : IUsuario) {
        const userExists = await userRepository.findOneBy({ email: usuario.email })

        if (userExists) {
            throw new BadRequestError('E-mail já cadastrado')
        }

        const hashPassword = await bcrypt.hash(usuario.senha, 10)
        const newUser = userRepository.create({...usuario, senha: hashPassword, dataNascimento: new Date(usuario.dataNascimento)})
        await userRepository.save(newUser)

        const { senha: _, ...user } = newUser

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
            expiresIn: '8h',
        })

        const authUser = { user: newUser, token }
        
        return authUser
    }

    async show(id: Number) {
        const user = await userRepository.findOneBy({ id: Number(id) })

        if (!user) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const { senha: _, ...userResult } = user;
        
        return userResult;
    }

    async changeStatus(status: boolean, id: number) {
        const user = await userRepository.findOneBy({ id: Number(id) })

        if (!user) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const newValue = {...user, status}

        await userRepository.update(id, newValue)
    }


    async update({ usuario, id }: UpdateUserProps) {
    
        const user = await userRepository.findOneBy({ id: Number(id) })

        if (!user) {
            throw new NotFoundError('Usuário não encontrado')
        }
        const formattedUser = {...usuario, dataNascimento: new Date(usuario.dataNascimento)}
        await userRepository.update(id, formattedUser);
        return formattedUser
    }


    async list() : Promise<any[]> {
        const users = await userRepository.find();
        return users.map((user) => {
            const { senha: _, ...userResult } = user;
            return userResult;
        })
    }

    async setAsAdmin(id: number) {
        const user = await userRepository.findOneBy({id})

        if (!user) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const newValue = {...user, isAdmin: true}
        return await userRepository.update(id, newValue)
    }

}