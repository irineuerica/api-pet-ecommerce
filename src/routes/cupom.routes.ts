import { Router } from 'express'
import { CupomController } from '../controllers/cupom.controller';

const cupomRoutes = Router()

cupomRoutes.get('/', new CupomController().listAll);
cupomRoutes.get('/user', new CupomController().listByUser);
cupomRoutes.post('/', new CupomController().create);


export default cupomRoutes