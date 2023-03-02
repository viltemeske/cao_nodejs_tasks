/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const data = require('./data.json');
require('dotenv').config();

const port = process.env.PORT || 8081;

const app = express();

app.use(cors());
app.use(express.json());

// 1.  Bendrinis GET route, kuris paduos visus duomenis

app.get('/people', (req, res) => {
  res.status(200).send(data);
});

/* 2. Dinaminis GET route, kur URL turės automobilio markę ir pagal ją prafiltruos,
ir grąžins tik tuos žmones, kurie turi šį automobilį. */

app.get('/cars/:brand', (req, res) => {
  const { brand } = req.params;
  const findOwners = data.people.filter((person) => person.car === brand);

  if (findOwners) {
    res.status(200).send(findOwners);
  } else {
    res.status(404).send('This car brand was not found');
  }
});

/* 3. Dinamins GET route, kuris priims vartotojo id
ir pagal jį grąžins atitinkamą vartotojo objektą. */

app.get('/people/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = data.people.find((p) => p.id === id);

  if (!person) {
    return res.status(404).send(`There is no person with id: '${id}'`);
  }

  res.status(200).send(person);
});

// 4. GET route, kuris grąžins visus el. paštus.

app.get('/emails', (req, res) => {
  const emails = data.people.map((item) => item.email);
  res.status(200).send(emails);
});

/* 5. GET route, į kurį pasikreipus, grąžins visų moterų (gender: Female)
vardą ir pavardę (formatas: ["Rita Kazlauskaite", "Monika Simaskaite"]). */

app.get('/females', (req, res) => {
  const female = data.people.filter((person) => person.gender === 'Female');
  const fullNames = female.map((fem) => `${fem.first_name} ${fem.last_name}`);
  res.status(200).json(fullNames);
});

app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
