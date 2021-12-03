export default async function serverError(err, req, res, next) {
  return res.sendStatus(500);
}
