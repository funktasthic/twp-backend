const { DataTypes, Model } = require("sequelize");
const db = require("../config/database");

class User extends Model {
    static id;
    static name;
    static lastname;
    static email;
    static phone;
    static image_url;
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
    image_url: {
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

// User have a role
User.Role = User.belongsTo(require("./role"), { foreignKey: "role_id" });

// User have many addresses
User.Address = User.hasMany(require("./address"), { foreignKey: "user_id" });


User.prototype.toJSON = function () {
  const { password, ...user } = this.get();
  delete user.password; // Delete the property password

  // Include the role_id
  user.role_id = this.getDataValue("role_id");

  return user;
};

module.exports = User;

