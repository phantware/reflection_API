import momemnt from 'moment';
const uuid = require('uuid');
import db from '../db/index';

const Reflection = {
  // Create a reflection
  async create(req, res) {
    const text = `INSERT INTO reflections(id, success, low_point, take_away, created_date, modified_date) VALUES($1,$2,$3,$4,$5,$6)  returning *`;
    const { success, low_point, take_away } = req.body;
    const values = [
      uuid.v4(),
      success,
      low_point,
      take_away,
      momemnt(new Date()),
      momemnt(new Date())
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  // Get all reflections
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM reflections';
    try {
      const { rows } = await db.query(findAllQuery);
      return res.status(200).send({ rows });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // Get a reflection

  async getOne(req, res) {
    const text = 'SELECT * FROM reflections WHERE id = $1';
    try {
      const value = [req.params.id];
      const { rows } = await db.query(text, value);
      if (!rows[0]) {
        return res.status(404).send({ message: 'reflection not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // Update a reflection
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM reflections where id = $1';
    const updateOneQuery =
      'UPDATE reflections SET success = $1, low_point = $2, take_away = $3, modified_date = $4, created_date = $5 returning *';
    try {
      const value = [req.body.id];
      const { rows } = await db.query(findOneQuery, value);
      if (!rows[0]) {
        return res.status(404).send({ message: 'reflection not found' });
      }
      const values = [
        req.body.success || rows[0].success,
        req.body.low_point || rows[0].low_point,
        req.body.take_away || rows[0].take_away,
        momemnt(new Date()),
        req.params.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  // Delete a reflection

  async delete(req, res) {
    const deleteQuery = 'DELETE FROM reflections where id = $1 returning *';
    try {
      const value = [req.params.id];
      const { rows } = await db.query(deleteQuery, value);
      if (!rows[0]) {
        return res.status(404).send({ message: 'reflection not found' });
      }
      return res.status(200).send({ message: 'Deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Reflection;
