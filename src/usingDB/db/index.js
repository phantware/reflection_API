import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING
});

// const connectionString =
//   'postgresql://postgres:postgres@localhost:5432/reflection_db';
// const pool = new Pool({ connectionString: connectionString });

pool.on('connect', () => {
  console.log('Connected to the database');
});

// Query Database
export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
