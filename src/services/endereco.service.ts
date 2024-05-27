import { NotFoundError } from '../helpers/errors.helper'
import { IEndereco } from '../interfaces/IEndereco'
import { enderecoRepository } from '../repositories/enderecoRepository'
import { usuarioRepository } from '../repositories/usuarioRepository'

type SaveEnderecoProps = {
    endereco: IEndereco
    id: number
}


export class EnderecoService {
    async create({endereco, id}: SaveEnderecoProps) {
        const user = await usuarioRepository.findBy({id})
        const newAddress = enderecoRepository.create({...endereco, usuario: user[0]})
        await enderecoRepository.save(newAddress,)

        return newAddress;
    }

    async show(id: Number) {
        const address = await enderecoRepository.findOneBy({ id: Number(id) })

        if (!address) {
            throw new NotFoundError('Endereço não encontrado')
        }

        return address;
    }

    async delete(id: Number) {
        const address = await enderecoRepository.findOneBy({ id: Number(id) })

        if (!address) {
            throw new NotFoundError('Endereco não encontrado')
        }

        return await enderecoRepository.delete({ id: Number(id) })
    }


    async update({ endereco, id }: SaveEnderecoProps) {

        const address = await enderecoRepository.findOneBy({ id: Number(id) })

        if (!address) {
            throw new NotFoundError('Endereço não encontrado')
        }

        return await enderecoRepository.update(id, endereco);
    }



    async list(id: number): Promise<IEndereco[]> {
        const enderecos = await enderecoRepository.find({
            where: {usuario: {id: id}}});
        return enderecos

    }

}