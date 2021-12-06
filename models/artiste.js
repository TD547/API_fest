'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artiste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Artiste.init({
    nom: DataTypes.STRING,
    photo: DataTypes.STRING,
    heure_passage: DataTypes.STRING,
    date_passage: DataTypes.STRING,
    style: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Artiste',
  });
  return Artiste;
};