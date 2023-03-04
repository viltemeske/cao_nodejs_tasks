/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.URI;

const client = new MongoClient(url);

const port = process.env.PORT || 8082;

const app = express();

const person = {
  name: 'Petras',
  surname: 'Slekys',
};

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('demo1').collection('task 7_1').find().toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post('/', async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db('demo1').collection('task 7_1').insertOne(person);

    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
