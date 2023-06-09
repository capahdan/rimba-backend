const db = require("../models");
const Items = db.items;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (limit*(page-1) + 1) - 1 : 0;
  
  return { limit, offset };
};

const getPagingData = (data,limit,offset) => {
  const { count: totalItems, rows: items } = data;
  
  return { total:totalItems, data:{items}, limit, skip:offset };
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
 


  Items.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, limit, offset);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};

// Create and Save a new Items
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nama_item) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Items
  const item = {
    nama_item: req.body.nama_item,
    unit: req.body.unit,
    stok: req.body.stok,
    harga_satuan: req.body.harga_satuan,
    barang: req.body.barang,
  };

  // Save Items in the database
  Items.create(item)
    .then(item => {
      res.send(
        { message: "Items was Created successfully!" ,data:{item}});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Items."
      });
    });
};

// Find a single Items with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Items.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Items with id=" + id
      });
    });
};

// Update a Items by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Items.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Items was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Items with id=${id}. Maybe Items was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Items with id=" + id
      });
    });
};

// Delete a Items with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Items.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Items was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Items with id=${id}. Maybe Items was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Items with id=" + id
      });
    });
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
  Items.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Items were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all items."
      });
    });
};
