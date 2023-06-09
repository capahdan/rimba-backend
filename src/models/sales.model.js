module.exports = (sequelize, Sequelize) => {
  const Sales = sequelize.define("sales", {
    kode_transaksi: {
      type: Sequelize.STRING
    },
    tanggal_transaksi:{
      type: Sequelize.DATE
    },
    items:{
      type: Sequelize.JSONB
    },
    qty:{
      type: Sequelize.INTEGER
    },
    total_diskon:{
      type: Sequelize.STRING
    },
    total_harga:{
      type: Sequelize.STRING
    }



    
  });

  return Sales;
};
