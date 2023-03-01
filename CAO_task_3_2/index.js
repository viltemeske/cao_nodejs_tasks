const express = require("express");
const path = require("path");

const fullNames = ["Petras Petraitis"];

const app = express();
app.use(express.json());
app.use(express.static(path.join("public")));
app.use(express.urlencoded({extended: true})); 

app.post("/api/form", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const fullName = `${name} ${surname}`;
  fullNames.push(fullName);
  res.status(200).send("OK");
});

app.get("/api/list", (req, res) => {
  const html = `<ul>${fullNames.map(fullName => `<li>${fullName}</li>`).join("")}<ul>`;
  res.send(html);
});


app.listen(7070, () => console.log("The server is running on port 7070"));

