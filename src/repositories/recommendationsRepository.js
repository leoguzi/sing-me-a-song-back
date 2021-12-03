import connection from '../database.js';

async function insertRecommendation({ name, youtubeLink }) {
  const result = await connection.query(
    `INSERT INTO recommendations (name, youtube_link, score) VALUES ($1, $2, $3);`,
    [name, youtubeLink, 0]
  );

  return result.rowCount;
}

export { insertRecommendation };
