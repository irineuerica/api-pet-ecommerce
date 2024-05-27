import { StatusCupom } from "../constants/enums/status-cupom"
import { TiposCupom } from "../constants/enums/tipos-cupom"

export interface ICupom {
    codigo?: string
    valor: number
    tipo: TiposCupom
    pedido_origem_id?: number
    cliente_id?: number
    status?: StatusCupom
}