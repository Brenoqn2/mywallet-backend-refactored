import app from "./app.js";
import "./setup.js";

const port = +process.env.PORT || 4000;
app.use((err, req, res, next) => {
  console.error(err);
  if (err.type === "error_missing_fields")
    return res.status(422).send({ message: err.message });
  if (err.type === "error_user_already_exists")
    return res.status(409).send({ message: err.message });
  if (err.type === "error_invalid_credentials")
    return res.status(401).send({ message: err.message });
  res.status(500).send("Something broke!");
  next();
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
