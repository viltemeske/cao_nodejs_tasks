/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.URI;

const client = new MongoClient(url);

const port = process.env.PORT || 8084;

const app = express();

app.use(cors());
app.use(express.json());

// 1. paduoda visus gyvūnus
// 4. Get by age descending - pagal amžių nuo seniausio iki jauniausio

app.get('/pets', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo3')
      .collection('pets')
      .find()
      // .sort({ age: -1 })
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// 2. Įkelia vieną gyvūną

app.post('/pets', async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db('demo3').collection('pets').insertOne(req.body);
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// 3. GET by type - paduoda įrašyto tipo gyvūnus

app.get('/pets/:type', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo3')
      .collection('pets')
      .find({ type: req.params.type })
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
