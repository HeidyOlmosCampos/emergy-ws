const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db_config");
const Emergency = require("./emergency");

const Action = sequelize.define(
  "action",
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergency_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Emergency,
        key: "id",
      },
      field: "emergency_id", // Nombre del campo en la tabla 'attend'
    }

  },
  {
    tableName: "action", // Nombre de la tabla en la base de datos
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Action.belongsTo(Emergency, { foreignKey: "emergency_id" });

// Método de instancia para modificar la salida JSON
Action.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Action;
