const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");
db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
});

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });
  
  // routes
  require('./src/routes/auth.routes')(app);
  require('./src/routes/user.routes')(app);
  require('./src/routes/customers.routes')(app);
  require('./src/routes/sales.routes')(app);
  require('./src/routes/items.routes')(app);

  
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
