module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phone_number:{
      type: Sequelize.INTEGER
    },
    birth_date:{
      type: Sequelize.DATE 
    },
    gender:{
      type: Sequelize.ENUM({
        values:['male','female']
      })
    },
    is_admin: {
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};
