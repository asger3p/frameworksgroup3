import { Router } from 'express';
import * as basketController from '../controller/basketController.js';

const router = Router();

router.get('/:customerId', basketController.getBasket);
router.put('/:customerId', basketController.updateBasket);
router.delete('/:customerId/:productId', basketController.removeProductFromBasket);
router.delete('/:customerId', basketController.clearBasket);


export default router;