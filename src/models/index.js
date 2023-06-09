const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER,
   dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.items = require("./items.model.js")(sequelize, Sequelize);
db.customers = require("./customers.model.js")(sequelize, Sequelize);
db.sales = require("./sales.model.js")(sequelize, Sequelize);

// Relasi antar user dan articles yaitu one to many
db.customers.hasMany(db.sales,{
  foreignKey: "customer_id",
});
db.sales.belongsTo(db.customers,{
  foreignKey: "customer_id",
});

module.exports = db;
