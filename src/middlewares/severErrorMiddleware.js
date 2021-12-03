export default async function serverError(error, req, res, next) {
  console.log(error);
  return res.sendStatus(500);
}
