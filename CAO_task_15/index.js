/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const mysqlConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

app.get('/', async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);
    console.log(`Success: ${con}`);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get('/items', async (req, res) => {
  try {
    const { limit } = req.query;
    const con = await mysql.createConnection(mysqlConfig);
    const selectAll = 'SELECT * FROM defaultdb.item;';
    const selectSome = `SELECT * FROM defaultdb.item LIMIT ${limit};`;
    const response = await con.execute(limit ? selectSome : selectAll);

    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.post('/items', async (req, res) => {
  try {
    if (req.body.title) {
      const con = await mysql.createConnection(mysqlConfig);

      const response = await con.execute(
        `INSERT INTO item (title) values (${con.escape(
          req.body.title,
        )});`,
      );
      res.send(response[0]);
      await con.end();
    } else {
      res.status(400).send('Bad syntax or empty list');
    }
  } catch (e) {
    console.log(e);
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isInteger(id) || !req.params.id) {
      const con = await mysql.createConnection(mysqlConfig);
      const response = await con.execute(
        `DELETE FROM item WHERE itemId=${con.escape(req.params.id)};`,
      );
      res.send(response[0]);
      await con.end();
    } else {
      res.status(400).send([]);
    }
  } catch (e) {
    if (e.code === 'ER_ACCESS_DENIED_ERROR') {
      res.status(401).send('Unauthorized');
    }
    console.log(e);
  }
});

app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.listen(process.env.SERVER_PORT, () => console.log(`The server is running on ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`));
