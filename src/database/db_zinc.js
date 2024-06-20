const { sequelize } = require("./db_config");
const Attend = require("../models/attend");
const Charge = require("../models/charge");
const Emergency = require("../models/emergency");
const Image = require("../models/image");
const User = require("../models/user");

const syncModels = async () => {
    try {
        // Sincronizar todos los modelos con la base de datos
        await sequelize.sync({ force: false });
        console.log('Todos los modelos fueron sincronizados correctamente');
    } catch (error) {
        console.error('Error al sincronizar los modelos:', error);
    }
};

module.exports = syncModels;
