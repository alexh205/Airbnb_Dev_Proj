"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    getImageable(options) { // Grabs the source of the image
      if (!this.imageableType) return Promise.resolve(null);

      const imageMix = `get${this.imageableType}`;

      return this[imageMix](options);
    }

    static associate(models) {
      Image.belongsTo(models.User, {
        foreignKey: "imageableId",
        constraints: false,

      });
      Image.belongsTo(models.Spot, {
        foreignKey: "imageableId",
        constraints: false,

      });
      Image.belongsTo(models.Review, {
        foreignKey: "imageableId",
        constraints: false,
        
      });
    }
  }
  Image.init(
    {
      imageableId: DataTypes.INTEGER,
      imageableType: { type: DataTypes.ENUM("User", "Spot", "Review") },
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
