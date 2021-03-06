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

  return { message: 'Created.' };
}

async function newVote({ id, vote }) {
  const result = await recommendationsRepository.registerVote({ id, vote });

  if (!result) {
    throw new RecommendationsError('Recomendation not found.');
  }

  if (result.score < -5) {
    const deleteResult = await recommendationsRepository.deleteRecommendation({
      id: result.id,
    });
    if (!deleteResult) {
      throw new RecommendationsError('Recommentadion already removed.');
    }
    return { message: 'Removed recommendation!' };
  }

  return { message: `${vote > 0 ? 'Up' : 'Down'} vote computed!` };
}

async function getRecommendation() {
  let scoreLimit = Number(Math.random().toFixed(2)) >= 0.3 ? '>10' : '<=10';
  let recommendation = await recommendationsRepository.fetchRecommendation({
    scoreLimit,
  });

  if (scoreLimit === '>10' && !recommendation) {
    scoreLimit = '<=10';
    recommendation = await recommendationsRepository.fetchRecommendation({
      scoreLimit,
    });
  }

  if (!recommendation) {
    throw new RecommendationsError('No recommendations found.');
  }
  return recommendation;
}

async function getTopRecommendations({ amount }) {
  const recommendations =
    await recommendationsRepository.fetchTopRecommendations({ amount });
  if (!recommendations) {
    throw new RecommendationsError('No recommendations found.');
  }
  return recommendations;
}

export {
  createRecommendation,
  newVote,
  getRecommendation,
  getTopRecommendations,
};
