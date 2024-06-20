const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db_config");

const User = sequelize.define(
  "user",
  {
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cellphone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "user", // Nombre de la tabla en la base de datos
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Método de instancia para modificar la salida JSON
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = User;
