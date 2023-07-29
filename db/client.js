const { Client } = require("pg");

const connnectionString =
  "postgres://gilsopul:NT3cCrB_AuM_VmM9DmkbnbGHqFB2ubWe@stampy.db.elephantsql.com/gilsopul";

const client = new Client({
  connectionString: connnectionString,
});

module.exports = client;
