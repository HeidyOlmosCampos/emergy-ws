const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db_config");
const User = require("./user");

const Emergency = sequelize.define(
  "emergency",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
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
    }
  },
  {
    tableName: "emergency", // Nombre de la tabla en la base de datos
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Emergency.belongsTo(User, { foreignKey: "user_id" });

// Método de instancia para modificar la salida JSON
Emergency.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Emergency;
