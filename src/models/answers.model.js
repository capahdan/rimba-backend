module.exports = (sequelize, Sequelize) => {
  const Answers = sequelize.define("answers", {
    answers: {
      type: Sequelize.JSONB
    },
    score :{
      type: Sequelize.INTEGER
    }
    
  });

  return Answers;
};
