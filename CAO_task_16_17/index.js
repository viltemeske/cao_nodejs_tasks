/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join('client')));

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
    res.send('Success');
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get('/cars/:id?', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isInteger(id) || !req.params.id) {
      const con = await mysql.createConnection(mysqlConfig);
      const selectAll = 'SELECT * FROM car';
      const selectOne = `${selectAll} WHERE carId=${id}`;
      const response = await con.execute(id ? selectOne : selectAll);
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

app.post('/cars', async (req, res) => {
  try {
    const car = req.body;
    if (car.title && car.image && car.price && car.numberplates) {
      const con = await mysql.createConnection(mysqlConfig);

      const response = await con.execute(
        `INSERT INTO car (title, image, price, numberplates) values (${con.escape(
          car.title,
        )}, ${con.escape(car.image)}, ${con.escape(car.price)}, ${con.escape(
          car.numberplates,
        )})`,
      );
      console.log(response);
      res.send(response);
      await con.end();
    } else {
      res.status(400).send('Bad syntax');
    }
  } catch (e) {
    console.log(e);
  }
});

app.delete('/cars/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!isNaN(id) && req.params.id !== undefined) {
      const con = await mysql.createConnection(mysqlConfig);
      const response = await con.execute(
        'DELETE FROM car WHERE carId = ?',
        [id],
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
  res.status(404).send('Page not found:(');
});

app.listen(process.env.SERVER_PORT, () => console.log(`The server is running on ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`));
