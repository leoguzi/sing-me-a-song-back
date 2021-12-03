class RecommendationsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RecommendationsError';
  }
}

export default RecommendationsError;
