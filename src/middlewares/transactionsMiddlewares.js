async function newTransactionMiddleware(req, res, next) {
  const { value, type } = req.body;

  if (!value || !type) {
    throw { type: "error_missing_fields", message: "Missing fields" };
  }

  next();
}

export { newTransactionMiddleware };
