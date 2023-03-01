const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(path.join("public")));

app.listen(8080, () => console.log("The server is running on port 8080"));
  
  