/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8086;

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.URI;
const client = new MongoClient(url);

app.get('/', (req, res) => {
  res.send({ msg: 'success' });
});

app.get('/categories', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo5')
      .collection('categories')
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo5')
      .collection('products')
      .aggregate([
        {
          $lookup:
          {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $unwind: '$category' },
        {
          $project: {
            title: 1,
            price: 1,
            category: '$category.title',
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

app.get('/categoryvalue', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('demo5')
      .collection('products')
      .aggregate([
        {
          $lookup:
        {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
        },
        { $unwind: '$category' },
        { $group: { _id: '$category.title', total: { $sum: '$price' } } },
      ])
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
