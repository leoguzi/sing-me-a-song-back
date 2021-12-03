import * as recommendationsService from '../services/recommendationsService.js';
import RecommendationsError from '../errors/recommendationsError.js';

async function newRecommendation(req, res, next) {
  if (
    typeof req.body.name !== 'string' ||
    typeof req.body.youtubeLink !== 'string' ||
    !req.body.name ||
    !req.body.youtubeLink
  ) {
    return res.status(400).send({ message: 'Invalid data!' });
  }

  try {
    const { name, youtubeLink } = req.body;

    const result = await recommendationsService.createRecommendation({
      name,
      youtubeLink,
    });

    return res.status(201).send({ message: result.message });
  } catch (error) {
    if (error instanceof RecommendationsError) {
      return res.status(400).send({ message: error.message });
    }
    return next(error);
  }
}

export { newRecommendation };
