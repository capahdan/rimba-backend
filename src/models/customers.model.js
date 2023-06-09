module.exports = (sequelize, Sequelize) => {
  const Customers = sequelize.define("customers", {
    nama: {
      type: Sequelize.STRING
    },
    kontak:{
      type: Sequelize.STRING
    },
    email:{
      type: Sequelize.STRING
    },
    alamat:{
      type: Sequelize.STRING
    },
    diskon:{
      type: Sequelize.INTEGER
    },
    tipe_diskon:{
      type: Sequelize.ENUM({
        values:['persen','fix']
      })
    },
    ktp:{
      type: Sequelize.STRING
    }
  });

  return Customers;
};
