const db = require("../models");
const Answers = db.answers;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (limit*(page-1) + 1) - 1 : 0;
  
  return { limit, offset };
};

const getPagingData = (data,limit,offset) => {
  const { count: totalItems, rows: answers } = data;
  
  return { total:totalItems, data:{answers}, limit, skip:offset };
};


// Retrieve all VehicleBrand from the database.
exports.findAll = (req, res) => {
  const score = req.query.score;
  const user_id = req.query.user_id;
  const { page, size } = req.query;

  const {limit, offset} = getPagination(page, size);
  let condition = null

  if (score) {
    condition = { score: { [Op.iLike]: `%${score}%` } };
  }

  if (user_id) {
    condition.user_id = { [Op.eq]: `${user_id}` } ;
  }
 


  Answers.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, limit, offset);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving answers."
      });
    });
};

// Create and Save a new Answers
exports.create = (req, res) => {
  // Validate request
  if (!req.body.answers) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Answers
  const answer = {
    answers: req.body.answers,
    score: req.body.score,
    user_id: req.body.user_id,
  };

  // Save Answers in the database
  Answers.create(answer)
    .then(answers => {
      res.send(
        { message: "Answer was Created successfully!" ,data:{answers}});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Answers."
      });
    });
};

// Find a single Answers with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Answers.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Answers with id=" + id
      });
    });
};

// Update a Answers by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Answers.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Answers was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Answers with id=${id}. Maybe Answers was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Answers with id=" + id
      });
    });
};

// Delete a Answers with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Answers.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Answers was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Answers with id=${id}. Maybe Answers was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Answers with id=" + id
      });
    });
};

// Delete all Answers from the database.
exports.deleteAll = (req, res) => {
  Answers.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Answers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all answers."
      });
    });
};
