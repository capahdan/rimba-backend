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

db.questions = require("./questions.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.articles = require("../models/articles.model.js")(sequelize, Sequelize);
db.answers = require("../models/answers.model.js")(sequelize, Sequelize);

// Relasi antar user dan articles yaitu one to many
db.user.hasMany(db.articles,{
  foreignKey: "user_id",
});
db.articles.belongsTo(db.user,{
  foreignKey: "user_id",
});

// Relasi antar user dan answers yaitu one to many
db.user.hasMany(db.answers,{
  foreignKey: "user_id",
});
db.answers.belongsTo(db.user,{
  foreignKey: "user_id",
});

// // Relasi antar vehicle_brands dan vehicle_types yaitu one to many
// db.vehicle_brands.hasMany(db.vehicle_types,{
//   foreignKey: "brand_id",
// });
// db.vehicle_types.belongsTo(db.vehicle_brands,{
//   foreignKey: "brand_id",
// });

module.exports = db;
