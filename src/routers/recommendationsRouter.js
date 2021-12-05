import { Router } from 'express';
import * as recommendationsController from '../controllers/recomendationsController.js';

const router = new Router();

router.post('/', recommendationsController.newRecommendation);
router.post('/:id/upvote', recommendationsController.upVoteRecommendation);
router.post('/:id/downvote', recommendationsController.downVoteRecommendation);
router.get('/random', recommendationsController.randomRecommendation);
router.get('/top/:amount', recommendationsController.topRecommendations);

export default router;
