import { Router } from 'express';
import { renderHome } from '../controller/indexController.js';

const router = Router();

router.get('/', renderHome);

export default router;