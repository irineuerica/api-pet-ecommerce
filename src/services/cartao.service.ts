import { Cartao } from '../entities/Cartao'
import { NotFoundError } from '../helpers/errors.helper'
import { ICartao } from '../interfaces/ICartao'
import { cartaoRepository } from '../repositories/cartaoRepository'
import { usuarioRepository } from '../repositories/usuarioRepository'

type SaveCartaoProps = {
    cartao: ICartao
    id: number
    userId?: number
}


export class CartaoService {
    async create({cartao, id}: SaveCartaoProps) {
        const user = await usuarioRepository.findBy({id})
        const newCard = cartaoRepository.create({...cartao, vencimento_mes: cartao.vencimentoMes, vencimento_ano: cartao.vencimentoAno, usuario: user[0]})
        await cartaoRepository.save(newCard)

        if(newCard.principal){
            await this.setPrincipal(newCard.usuario.id, newCard);
        }
        
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


    async update({ cartao, id, userId }: SaveCartaoProps) {

        const card = await cartaoRepository.findOneBy({ id: Number(id) })

        if (!card) {
            throw new NotFoundError('Cartão não encontrado')
        }

        const cardNewValue = {
            id: cartao.id,
            numero: cartao.numero,
            nome: cartao.nome,
            bandeira: cartao.bandeira,
            vencimento_mes: cartao.vencimentoMes, 
            vencimento_ano: cartao.vencimentoAno,
            principal: cartao.principal,
            criado_em: cartao.criado_em,
            atualizado_em: cartao.atualizado_em,
            usuario: cartao.usuario,
            cvv: cartao.cvv
        }
        
        if(cardNewValue.principal && userId){
            await this.setPrincipal(userId, cardNewValue);
        }

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

    async setPrincipal(userId: number, card: Cartao): Promise<any> {
        const principal = await cartaoRepository.findOne({
            where: {usuario: {id: userId}, principal: true}});
        
        if(principal){
           await  cartaoRepository.update(principal.id, {...principal, principal: false});
           await  cartaoRepository.update(card.id, {...card, principal: true});
        }

    }
}