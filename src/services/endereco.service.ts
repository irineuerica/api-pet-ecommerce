import { NotFoundError } from '../helpers/errors.helper'
import { IEndereco } from '../interfaces/IEndereco'
import { enderecoRepository } from '../repositories/enderecoRepository'

type UpdateEnderecoProps = {
    endereco: IEndereco
    id: number
}


export class EnderecoService {
    async create(endereco: IEndereco) {

        const newAddress = enderecoRepository.create(endereco)
        await enderecoRepository.save(newAddress)

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


    async update({ endereco, id }: UpdateEnderecoProps) {

        const address = await enderecoRepository.findOneBy({ id: Number(id) })

        if (!address) {
            throw new NotFoundError('Endereço não encontrado')
        }

        return await enderecoRepository.update(id, endereco);
    }



    async list(): Promise<IEndereco[]> {
        return await enderecoRepository.find();

    }

}