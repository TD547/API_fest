'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Festival extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Festival.init({
    date_deb: DataTypes.DATE,
    date_fin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Festival',
  });
  return Festival;
};