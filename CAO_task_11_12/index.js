/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 8088;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join('client')));

const url = process.env.URI;
const client = new MongoClient(url);

app.get('/memberships', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo7')
      .collection('services')
      .aggregate([
        {
          $project: {
            id: '$_id',
            price: 1,
            name: 1,
            description: 1,
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post('/memberships', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db('demo7').collection('services').insertOne(req.body);
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.delete('/memberships/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo7')
      .collection('services')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get('/users/:order?', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo7')
      .collection('users')
      .aggregate([
        {
          $lookup:
          {
            from: 'services',
            localField: 'service_id',
            foreignField: '_id',
            as: 'membership',
          },
        },
        { $unwind: '$membership' },
        {
          $project: {
            _id: 0,
            name: 1,
            surname: 1,
            email: 1,
            membership: '$membership.name',
          },
        },
      ])
      .sort({ name: req.params.order?.toLowerCase() === 'dsc' ? -1 : 1 })
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo7')
      .collection('users')
      .insertOne({
        ...req.body,
        service_id: new ObjectId(req.body.service_id),
      });
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
