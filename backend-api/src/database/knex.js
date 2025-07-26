const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const types = require("pg").types;
types.setTypeParser(types.builtins.INT8, (value) => {
  return parseInt(value, 10);
});
types.setTypeParser(types.builtins.DATE, (val) => val);
module.exports = require("knex")({
  client: "pg",
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  searchPath: ["project"],
  pool: {
    min: 0,
    max: 10,
    afterCreate: (conn, done) => {
      conn.query("SET search_path TO 'project'", (err) => {
        done(err, conn);
      });
    },
  },
});
