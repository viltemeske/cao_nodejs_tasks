/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.URI;

const client = new MongoClient(url);

const port = process.env.PORT || 8083;

const app = express();

const person = {
  name: 'Vardenis',
  surname: 'Pavardenis',
  age: 15,
};

app.use(cors());
app.use(express.json());

app.get('/people', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('demo2').collection('people').find().toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post('/people', async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db('demo2').collection('people').insertOne(person);

    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
