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

app.listen(process.env.SERVER_PORT, () => console.log(`The server is running on ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`));
