import { Router } from 'express';
import * as recomendationsController from '../controllers/recomendationsController.js';

const router = new Router();

router.post('/', recomendationsController.newRecommendation);

export default router;
