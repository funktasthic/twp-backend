const { DataTypes, Model } = require('sequelize');
const db = require('../config/database');

class Image extends Model {
    static image_url;
    static entityType;
    static entityId;
}

Image.init({
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entityType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'Image',
  timestamps: true,
});

Image.prototype.toJSON = function(){
  const values = {...this.get() };
  return values;
}

module.exports = Image;
