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
            allowNull: false,
            unique: true
        },

    },
{
    sequelize: db,
    modelName: "Role",
    timestamps: true,
});

Role.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
}

module.exports = Role;