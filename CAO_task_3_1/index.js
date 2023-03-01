const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const cars = ['BMW', 'VW', 'Porshe'];

app.get("/", (req, res) => {
    res.send(cars);
  });

app.post("/", (req, res) => {
  console.log(req.body);
  cars.push(...req.body);
      res.send("OK");
  })

app.listen(8080, () => console.log("The server is running on port 8080"));
  
  