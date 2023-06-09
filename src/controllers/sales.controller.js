const db = require("../models");
const Sales = db.sales;
const Items = db.items;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (limit*(page-1) + 1) - 1 : 0;
  
  return { limit, offset };
};

const getPagingData = (data,limit,offset) => {
  const { count: totalItems, rows: sales } = data;
  
  return { total:totalItems, data:{sales}, limit, skip:offset };
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
 


  Sales.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, limit, offset);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sales."
      });
    });
};

// Create and Save a new Sales
exports.create = (req, res) => {
  // Validate request
  if (!req.body.kode_transaksi) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Sales
  const item = {
    kode_transaksi: req.body.kode_transaksi,
    tanggal_transaksi: req.body.tanggal_transaksi,
    customer_id: req.body.customer_id,
    items: req.body.items,
    qty: req.body.qty,
    total_diskon: req.body.total_diskon,
    total_harga: req.body.total_harga,
    total_bayar: req.body.total_bayar,
  };



  // Save Sales in the database
  Sales.create(item)
    .then(item => {
      res.send(
        { message: "Sales was Created successfully!" ,data:{item}});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sales."
      });
    });
};

// Find a single Sales with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sales.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sales with id=" + id
      });
    });
};

// Update a Sales by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Sales.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sales was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Sales with id=${id}. Maybe Sales was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sales with id=" + id
      });
    });
};

// Delete a Sales with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sales.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sales was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Sales with id=${id}. Maybe Sales was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sales with id=" + id
      });
    });
};

// Delete all Sales from the database.
exports.deleteAll = (req, res) => {
  Sales.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Sales were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sales."
      });
    });
};
