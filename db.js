const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const connectionString =
  'postgresql://postgres:postgres@localhost:5432/reflection_db';
const pool = new Pool({ connectionString: connectionString });

pool.on('connect', () => {
  console.log('Connected to the database');
});

// Create table

const createTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      reflections(
        id UUID PRIMARY KEY,
        success TEXT NOT NULL,
        low_point TEXT NOT NULL,
        take_away TEXT NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      console.log('table created');
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
// Drop table

const dropTable = () => {
  const queryText = 'DROP TABLE IF EXISTS reflections';
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('Client removed');
  process.exit(0);
});

module.exports = {
  createTable,
  dropTable
};

require('make-runnable');
