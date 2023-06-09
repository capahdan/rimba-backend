const db = require("../models");
const Customers = db.customers;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (limit*(page-1) + 1) - 1 : 0;
  
  return { limit, offset };
};

const getPagingData = (data,limit,offset) => {
  const { count: totalItems, rows: customers } = data;
  
  return { total:totalItems, data:{customers}, limit, skip:offset };
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
 


  Customers.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, limit, offset);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};

// Create and Save a new Customers
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Customers
  const item = {
    nama: req.body.nama,
    kontak: req.body.kontak,
    email: req.body.email,
    alamat: req.body.alamat,
    diskon: req.body.diskon,
    tipe_diskon: req.body.tipe_diskon,
    ktp: req.body.ktp,
  };

  // Save Customers in the database
  Customers.create(item)
    .then(item => {
      res.send(
        { message: "Customers was Created successfully!" ,data:{item}});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customers."
      });
    });
};

// Find a single Customers with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customers.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Customers with id=" + id
      });
    });
};

// Update a Customers by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customers.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customers was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Customers with id=${id}. Maybe Customers was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customers with id=" + id
      });
    });
};

// Delete a Customers with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customers.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customers was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Customers with id=${id}. Maybe Customers was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Customers with id=" + id
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customers.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Customers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    });
};
