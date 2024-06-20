const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db_config");
const User = require("./user");
const Emergency = require("./emergency");
const Charge = require("./charge");

const Attend = sequelize.define(
  "attend",
  {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      field: "user_id", // Nombre del campo en la tabla 'attend'
    },
    emergency_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Emergency,
        key: "id",
      },
      field: "emergency_id", // Nombre del campo en la tabla 'attend'
    },
    charge_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Charge,
        key: "id",
      },
      field: "charge_id", // Nombre del campo en la tabla 'attend'
    },
  },
  {
    tableName: "attend", // Nombre de la tabla en la base de datos
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Definición de las relaciones con las otras tablas
Attend.belongsTo(User, { foreignKey: "user_id" });
Attend.belongsTo(Emergency, { foreignKey: "emergency_id" });
Attend.belongsTo(Charge, { foreignKey: "charge_id" });

// Método de instancia para modificar la salida JSON
Attend.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Attend;
