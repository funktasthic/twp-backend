const { DataTypes, Model } = require("sequelize");
const db = require("../config/database");

class User extends Model {
    static id;
    static name;
    static lastname;
    static email;
    static phone;
    static password;
    static token;
    static isActive;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "User",
    timestamps: true,
  }
);

User.prototype.toJSON = function () {
  const { password, ...user } = this.get();
  delete user.password; // Delete the property password
  return user;
};

module.exports = User;

