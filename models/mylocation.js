"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class myLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.myLocation.belongsTo(models.user);
    }
  }
  myLocation.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      lat: DataTypes.DECIMAL,
      long: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "myLocation",
    }
  );
  return myLocation;
};
