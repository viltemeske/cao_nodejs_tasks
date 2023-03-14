/* eslint-disable max-len */
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

/* app.get('/shirt', async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const response = await con.execute(
      'SELECT * FROM defaultdb.shirt ORDER BY price ASC LIMIT 10;',
    );

    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
}); */

app.get('/shirt/:size', async (req, res) => {
  try {
    const { size } = req.query;
    const { limit } = req.query;
    const con = await mysql.createConnection(mysqlConfig);
    const oderByPrice = `ORDER BY price ASC LIMIT ${limit}`;
    const selectAll = 'SELECT * FROM defaultdb.shirt';
    const allByPrice = `${selectAll}  ${oderByPrice}`;
    const selectBySize = `${selectAll} WHERE size = '${size}' ${oderByPrice}`;
    const response = await con.execute(size ? selectBySize : allByPrice);
    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.post('/shirt', async (req, res) => {
  try {
    const con = await mysql.createConnection(mysqlConfig);

    const response = await con.execute(
      `INSERT INTO shirt (brand, model, size, price) values ('${req.body.brand}', '${req.body.model}', '${req.body.size}', ${req.body.price});`,
    );

    res.send(response[0]);
    await con.end();
  } catch (e) {
    console.log(e);
  }
});

app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.listen(process.env.SERVER_PORT, () => console.log(`The server is running on ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`));
