import { Cartao } from '../entities/Cartao'
import { NotFoundError } from '../helpers/errors.helper'
import { ICartao } from '../interfaces/ICartao'
import { cartaoRepository } from '../repositories/cartaoRepository'
import { userRepository } from '../repositories/userRepository'

type SaveCartaoProps = {
    cartao: ICartao
    id: number
}


export class CartaoService {
    async create({cartao, id}: SaveCartaoProps) {
        const user = await userRepository.findBy({id})
        const newCard = cartaoRepository.create({...cartao, vencimento_mes: cartao.vencimentoMes, vencimento_ano: cartao.vencimentoAno, usuario: user[0]})
        await cartaoRepository.save(newCard)

        return newCard;
    }

    async show(id: Number) {
        const card = await cartaoRepository.findOneBy({ id: Number(id) })

        if (!card) {
            throw new NotFoundError('Cartão não encontrado')
        }
        return {...card, vencimentoMes: card.vencimento_mes, vencimentoAno: card.vencimento_ano}
    }

    async delete(id: Number) {
        const card = await cartaoRepository.findOneBy({ id: Number(id) })

        if (!card) {
            throw new NotFoundError('Cartão não encontrado')
        }

        return await cartaoRepository.delete({ id: Number(id) })
    }


    async update({ cartao, id }: SaveCartaoProps) {

        const card = await cartaoRepository.findOneBy({ id: Number(id) })

        if (!card) {
            throw new NotFoundError('Cartão não encontrado')
        }

        const cardNewValue = {...cartao, vencimento_mes: cartao.vencimentoMes, vencimento_ano: cartao.vencimentoAno,}

        return await cartaoRepository.update(id, cardNewValue);
    }



    async list(id: number): Promise<Cartao[]> {
        const cards = await cartaoRepository.find({
            where: {usuario: {id: id}}});

        const cardsFormatted = cards.map((cartao) => {
            return {...cartao, vencimentoMes: cartao.vencimento_mes, vencimentoAno: cartao.vencimento_ano}
        })
        return cardsFormatted

    }
}