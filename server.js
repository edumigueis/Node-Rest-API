const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "API do grupo."
  });
});
require("./app/routes/aluno.routes.js")(app);
require("./app/routes/resultado.routes.js")(app);
require("./app/routes/disciplina.routes.js")(app);
require("./app/routes/matricula.routes.js")(app);

// set port, listen for requests
app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});