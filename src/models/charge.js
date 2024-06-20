const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db_config");

const Charge = sequelize.define(
  "charge",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "charge", // Nombre de la tabla en la base de datos
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Método de instancia para modificar la salida JSON
Charge.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Charge;
