/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8085;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join('public')));

const url = process.env.URI;
const client = new MongoClient(url);

app.get('/', (req, res) => {
  res.send({ msg: 'success' });
});

app.get('/pets/:types/:order?', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo4')
      .collection('pets')
      .find({ type: { $in: req.params.types?.split(',') } })
      .sort({ age: req.params.order?.toLowerCase() === 'dsc' ? -1 : 1 })
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post('/pets', async (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.type) {
    return res.status(400).send({ err: 'Incorrect data passed' });
  }
  try {
    const con = await client.connect();
    const dbRes = await con.db('demo4').collection('pets').insertOne({
      name: req.body.name,
      type: req.body.type,
      age: req.body.age,
    });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
