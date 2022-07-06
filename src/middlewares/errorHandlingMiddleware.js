import "express-async-errors";

function errorHandlingMiddleware(err, req, res, next) {
  console.error(err);
  if (err.type === "error_missing_fields")
    return res.status(422).send({ message: err.message });
  if (err.type === "error_user_already_exists")
    return res.status(409).send({ message: err.message });
  if (err.type === "error_invalid_credentials")
    return res.status(401).send({ message: err.message });
  if (err.type === "error_invalid_type")
    return res.status(422).send({ message: err.message });
  if (err.type === "error_invalid_token")
    return res.status(401).send({ message: err.message });
  if (err.type === "error_invalid_value")
    return res.status(422).send({ message: err.message });
  res.status(500).send("Something broke!");
  next();
}

export default errorHandlingMiddleware;
