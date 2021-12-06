import * as recommendationsService from '../src/services/recommendationsService.js';
import * as recommendationsRepository from '../src/repositories/recommendationsRepository.js';
import RecommendationsError from '../src/errors/recommendationsError.js';

const sut = recommendationsService;

describe('createRecommendation', () => {
  it('Should throw a RecommendationsError if invalid youtube linl', async () => {
    const invalidRecommendation = {
      name: 'Music name',
      youtubeLink: 'Invalid link',
    };
    const promise = sut.createRecommendation(invalidRecommendation);
    await expect(promise).rejects.toThrowError(RecommendationsError);
  });

  it('Should throw a RecommendationsError if name length < 3', async () => {
    const invalidRecommendation = {
      name: 'Mu',
      youtubeLink: 'https://youtu.be/5mpafLYHVd0',
    };
    const promise = sut.createRecommendation(invalidRecommendation);
    await expect(promise).rejects.toThrowError(RecommendationsError);
  });

  it('Should return sucess message if insertion success', async () => {
    jest
      .spyOn(recommendationsRepository, 'insertRecommendation')
      .mockImplementationOnce(() => {});

    const recommendation = {
      name: 'Be Svendsen live at Mount Nemrut, in Türkiye for Cercle',
      youtubeLink: 'https://youtu.be/5mpafLYHVd0',
    };

    const result = await sut.createRecommendation(recommendation);

    expect(result).toEqual({ message: 'Created.' });
  });
});

describe('newVote', () => {
  const votedRecommendation = {
    id: 10,
    name: 'Recommendation Name',
    youtube_link: 'https://youtu.be/5mpafLYHVd0',
    score: -6,
  };

  it('Should throw RecommendationsError if recommendation not found', async () => {
    jest
      .spyOn(recommendationsRepository, 'registerVote')
      .mockReturnValueOnce(null);
    const voteInfo = {
      id: '10',
      vote: 1,
    };
    const promise = sut.newVote(voteInfo);
    await expect(promise).rejects.toThrowError(RecommendationsError);
  });
  it('Should remove recommendation if score < -5', async () => {
    jest
      .spyOn(recommendationsRepository, 'registerVote')
      .mockReturnValueOnce(votedRecommendation);
    jest
      .spyOn(recommendationsRepository, 'deleteRecommendation')
      .mockReturnValueOnce(1);

    const voteInfo = {
      id: '10',
      vote: -1,
    };
    const result = await sut.newVote(voteInfo);
    expect(result).toEqual({ message: 'Removed recommendation!' });
  });

  it('Should throw a RecommendationsError if the recommendation has already been removed', async () => {
    jest
      .spyOn(recommendationsRepository, 'registerVote')
      .mockReturnValueOnce(votedRecommendation);
    jest
      .spyOn(recommendationsRepository, 'deleteRecommendation')
      .mockReturnValueOnce(0);

    const voteInfo = {
      id: '10',
      vote: -1,
    };

    const promise = sut.newVote(voteInfo);
    await expect(promise).rejects.toThrowError(RecommendationsError);
  });

  it('Should register a up vote if everything is ok', async () => {
    votedRecommendation.score = 0;
    jest
      .spyOn(recommendationsRepository, 'registerVote')
      .mockReturnValueOnce(votedRecommendation);

    const voteInfo = {
      id: '10',
      vote: 1,
    };
    const result = await sut.newVote(voteInfo);
    expect(result).toEqual({ message: 'Up vote computed!' });
  });

  it('Should register a down vote if everything is ok', async () => {
    votedRecommendation.score = 0;
    jest
      .spyOn(recommendationsRepository, 'registerVote')
      .mockReturnValueOnce(votedRecommendation);

    const voteInfo = {
      id: '10',
      vote: -1,
    };
    const result = await sut.newVote(voteInfo);
    expect(result).toEqual({ message: 'Down vote computed!' });
  });
});

describe('getRecommendation', () => {
  const recommendation = {
    id: 10,
    name: 'Recommendation Name',
    youtube_link: 'https://youtu.be/5mpafLYHVd0',
    score: 0,
  };

  it('Trows a RecommendationError if no recommendations are found', async () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.2);
    jest
      .spyOn(recommendationsRepository, 'fetchRecommendation')
      .mockReturnValueOnce(0);

    const promise = sut.getRecommendation();
    await expect(promise).rejects.toThrowError(RecommendationsError);
  });

  it('Returns a recommendation with a score < 10 30% of the times', async () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.29);
    jest
      .spyOn(recommendationsRepository, 'fetchRecommendation')
      .mockReturnValueOnce(recommendation);

    const result = await sut.getRecommendation();
    expect(result).toEqual(recommendation);
  });

  it('Returns a recommendation with a score > 10 70% of the times', async () => {
    recommendation.score = 11;
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);
    jest
      .spyOn(recommendationsRepository, 'fetchRecommendation')
      .mockReturnValueOnce(recommendation);

    const result = await sut.getRecommendation();
    expect(result).toEqual(recommendation);
  });

  it('Returns a recommendation with a score > 10 70% of the times', async () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.31);
    jest
      .spyOn(recommendationsRepository, 'fetchRecommendation')
      .mockReturnValueOnce(recommendation);

    const result = await sut.getRecommendation();
    expect(result).toEqual(recommendation);
  });
});

describe('getTopRecommendations', () => {
  it('Throws a RecommendationsError if no recommendations are found', async () => {
    jest
      .spyOn(recommendationsRepository, 'fetchTopRecommendations')
      .mockReturnValueOnce(0);

    const promise = sut.getTopRecommendations(10);

    await expect(promise).rejects.toThrowError(RecommendationsError);
  });

  it('Returns a list of recommendations', async () => {
    jest
      .spyOn(recommendationsRepository, 'fetchTopRecommendations')
      .mockReturnValueOnce(new Array(10));

    const result = await sut.getTopRecommendations(10);

    expect(result).toEqual(expect.any(Array));
    expect(result.length).toEqual(10);
  });
});
