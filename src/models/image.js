const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db_config");
const Emergency = require("./emergency");

const Image = sequelize.define(
  "image",
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
    url_image: {
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
      field: "emergency_id", // Nombre del campo en la tabla 'image'
    }
  },
  {
    tableName: "image", // Nombre de la tabla en la base de datos
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Definición de las relaciones con las otras tablas
Image.belongsTo(Emergency, { foreignKey: "emergency_id" });

// Método de instancia para modificar la salida JSON
Image.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Image;
