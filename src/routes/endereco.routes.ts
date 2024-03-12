import { Router } from 'express'
import { EnderecoController } from '../controllers/endereco.controller';

const enderecoRoutes = Router()

enderecoRoutes.post('/', new EnderecoController().create);
enderecoRoutes.get('/', new EnderecoController().list);
enderecoRoutes.get('/:id', new EnderecoController().show);
enderecoRoutes.put('/:id', new EnderecoController().update);
enderecoRoutes.delete('/:id', new EnderecoController().delete);

export default enderecoRoutes