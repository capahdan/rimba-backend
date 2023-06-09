module.exports = (sequelize, Sequelize) => {
  const Items = sequelize.define("items", {
    nama_item: {
      type: Sequelize.STRING
    },
    unit:{
      type: Sequelize.ENUM({
        values:['kg','pcs']
      })
    },  
    stok:{
      type: Sequelize.INTEGER
    },
    harga_satuan:{
      type: Sequelize.STRING
    },
    barang:{
      type: Sequelize.STRING
    }

    
  });

  return Items;
};
