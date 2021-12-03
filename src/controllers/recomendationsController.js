import * as recommendationsService from '../services/recommendationsService.js';
import RecommendationsError from '../errors/recommendationsError.js';

async function newRecommendation(req, res, next) {
  const { name, youtubeLink } = req.body;
  if (
    typeof name !== 'string' ||
    typeof youtubeLink !== 'string' ||
    !name ||
    !youtubeLink
  ) {
    return res.status(400).send({ message: 'Invalid data!' });
  }

  try {
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

async function upVoteRecommendation(req, res, next) {
  let { id } = req.params;
  id = Number(id);
  if (typeof id !== 'number' || id % 1 !== 0) {
    return res.status(400).send({ message: 'Bad request!' });
  }
  try {
    const result = await recommendationsService.newVote({ id, vote: 1 });
    return res.status(200).send({ message: result.message });
  } catch (error) {
    if (error instanceof RecommendationsError) {
      return res.status(404).send({ message: error.message });
    }
    return next(error);
  }
}

async function downVoteRecommendation(req, res, next) {
  let { id } = req.params;
  id = Number(id);
  if (typeof id !== 'number' || id % 1 !== 0) {
    return res.status(400).send({ message: 'Bad request!' });
  }
  try {
    const result = await recommendationsService.newVote({ id, vote: -1 });
    return res.status(200).send({ message: result.message });
  } catch (error) {
    if (error instanceof RecommendationsError) {
      return res.status(404).send({ message: error.message });
    }
    return next(error);
  }
}

export { newRecommendation, upVoteRecommendation, downVoteRecommendation };
