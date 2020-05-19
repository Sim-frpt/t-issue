import Pgp from 'pg-promise';
import Debug from 'debug';

const debug = Debug("t-issue:db");
const pgp = Pgp();

const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

const db = pgp(connection);

db.connect()
  .then(obj => {
    debug(`Connected to ${process.env.DB_NAME}`);

    obj.done();
  })
  .catch(error => {
    debug("ERROR: ", error.message || error);
  });

export default db;
