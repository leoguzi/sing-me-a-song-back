import RecommendationsError from '../errors/recommendationsError.js';
import * as recommendationsRepository from '../repositories/recommendationsRepository.js';

async function createRecommendation({ name, youtubeLink }) {
  const validLink = youtubeLink.match(
    '^(https?://)?(www.)?(youtube.com|youtu.be)/.+$'
  );

  if (name.length < 3) {
    throw new RecommendationsError('Name too small!');
  }

  if (!validLink) {
    throw new RecommendationsError('Must be a valid Youtube URL');
  }

  await recommendationsRepository.insertRecommendation({ name, youtubeLink });

  return { message: 'Ceated!' };
}

export { createRecommendation };
