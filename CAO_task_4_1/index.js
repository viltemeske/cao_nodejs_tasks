const express = require("express");
const cors = require("cors");

const app = express();

const cars = {
  bmw: ["i3", "i8", "1 series", "3 series", "5 series"],
  mb: ["A class", "C class", "E class", "S class"],
  vw: ["Golf", "Arteon", "UP"]
};

app.use(cors());
app.use(express.json());

app.get("/cars/:brand", (req, res) => {
  const brand = req.params.brand;
  const models = cars[brand];
  if(models) {
      res.status(200).send(models);
  } else {
      res.status(404).send('This brand was not found');
  }
});

app.listen(8080, () => console.log("The server is running on port 8080"));