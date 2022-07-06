import connection from "../database.js";

function insertTransaction(user, value, type) {
  return connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [user.id, value, type]
  );
}

function getTransactions(user) {
  return connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [user.id]
  );
}

export { insertTransaction, getTransactions };
