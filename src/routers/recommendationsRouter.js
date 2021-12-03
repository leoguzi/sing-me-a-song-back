import { Router } from 'express';
import * as recomendationsController from '../controllers/recomendationsController.js';

const router = new Router();

router.post('/', recomendationsController.newRecommendation);
router.post('/:id/upvote', recomendationsController.upVoteRecommendation);
router.post('/:id/downvote', recomendationsController.downVoteRecommendation);

export default router;
