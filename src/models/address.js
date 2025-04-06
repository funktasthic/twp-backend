const { DataTypes, Model } = require("sequelize");
const db = require("../config/database");

class Address extends Model {
    static id;
    static name;
    static street;
    static number;
    static city;
    static neighborhood;
    static country;
    static lat;
    static long;
    static type;
}

Address.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        long: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM("Casa", "Departamento", "Otro"),
            defaultValue: "Casa",
        }
    },
{
    sequelize: db,
    modelName: "Address",
    timestamps: true,
});

Address.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
}

module.exports = Address;