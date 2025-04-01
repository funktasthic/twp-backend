const { DataTypes, Model } = require("sequelize");
const db = require("../config/database");

class Address extends Model {
    static id;
    static name;
    static street;
    static neighborhood;
    static postal_code;
    static state;
    static country;
    static lat;
    static lng;
    static type;
}

Address.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        lng: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("Home", "Apartment", "Work", "Other"),
            defaultValue: "Home"
        }
    },
    {
        sequelize: db,
        modelName: "Address"
    }
);

Address.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
};

module.exports = Address;
