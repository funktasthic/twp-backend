const { DataTypes, Model } = require("sequelize");
const db = require("../config/database");

class Role extends Model {
    static id;
    static name;
}

Role.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Role",
  }
);

module.exports = Role;
