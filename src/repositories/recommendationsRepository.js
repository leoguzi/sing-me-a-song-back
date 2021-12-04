import connection from '../database.js';

async function insertRecommendation({ name, youtubeLink }) {
  const result = await connection.query(
    `INSERT INTO recommendations (name, youtube_link, score) VALUES ($1, $2, $3);`,
    [name, youtubeLink, 0]
  );

  return result.rowCount;
}

async function registerVote({ id, vote }) {
  const result = await connection.query(
    `UPDATE recommendations SET score=score+$2 WHERE id=$1 RETURNING *;`,
    [id, vote]
  );

  return result.rows[0];
}

async function deleteRecommendation({ id }) {
  await connection.query(`DELETE FROM recommendations WHERE id=$1;`, [id]);
}

async function fetchRecommendation({ scoreLimit }) {
  const result = await connection.query(
    `SELECT * FROM recommendations WHERE score ${scoreLimit} ORDER BY RANDOM() LIMIT 1;`
  );
  return result.rows[0];
}

export {
  insertRecommendation,
  registerVote,
  deleteRecommendation,
  fetchRecommendation,
};
