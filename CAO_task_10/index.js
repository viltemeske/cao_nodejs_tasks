/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8087;

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.URI;
const client = new MongoClient(url);

app.get('/', (req, res) => {
  res.send({ msg: 'success' });
});

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo6')
      .collection('users')
      .find()
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
    const dbRes = await con.db('demo6').collection('users').insertOne(req.body);
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get('/comments', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo6')
      .collection('comments')
      .aggregate([
        {
          $lookup:
          {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'userinfo',
          },
        },
        { $unwind: '$userinfo' },
        {
          $project: {
            _id: 0,
            date: 1,
            comment: 1,
            username: { name: '$userinfo.name', id: '$userinfo._id' },
          },
        },
      ])
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.delete('/comments/:_id', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo6')
      .collection('comments')
      .deleteOne({ _id: ObjectId(req.params.id) });
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
