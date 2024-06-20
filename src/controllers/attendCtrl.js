const Attend = require('../models/attend');
const ChargeCtrl = require('./chargeCtrl');
const UserCtrl = require('./userCtrl');
const moment = require('moment');
const {subirImagenABucket, compararRostros} = require('../services/aws');

class AttendCtrl {
  constructor() {}

  async getAll(req, res){
    try{
      // const usuarios = await this.obtenerTodos();

      // res.status(200).send(usuarios);

    }catch (error){
      console.log(error);
      res.status(500).send("Error al cargar la imagen");
    }
  }

  async createByImage(req, res){
    try{
      const imagen = req.file.buffer;
      const emergencyId = req.body.emergencyId;
      const sourceImage = `${Date.now()}_${req.file.originalname}`;
      var imgURL = "";
      await subirImagenABucket(imagen, sourceImage)
      .then((url) => {
        imgURL = url;
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ error: error.message });
      });

      const usuarios = await UserCtrl.obtenerTodos();
      const cargoDefecto = await ChargeCtrl.obtenerPrimero();
      var array = [];
      for (const usuario of usuarios) {
        const targetImage = usuario.url.split('/').pop();  
        const esUsuarioExistente = await this.existeUsuarioEnEmergencia(emergencyId, usuario.id);
        if (!esUsuarioExistente) {
          const coincidencia = await compararRostros(sourceImage, targetImage);
          if (coincidencia > 87){
            const nuevoAttend = await Attend.create({
              date : moment().format('YYYY-MM-DD'),
              user_id : usuario.id,
              emergency_id : emergencyId,
              charge_id : cargoDefecto.id,
            });
            array.push(nuevoAttend);
          }
        }
      }
  

      res.status(200).send(array);

    }catch (error){
      console.log(error);
      res.status(500).send("Error al cargar la imagen");
    }
  }


  async compararRostros(sourceImage, targetImage){
    try{
      await compararRostros(sourceImage, targetImage)
      .then((similtud) => {
        return similtud;
      })
      .catch(() => {
        return 0;
      });
    }catch (error){
      return 0;
    }
  }
  

  obtenerTodos = async () => {
    try {
      const todos = await Attend.findAll();
      return todos;
    } catch (error) {
      throw new Error('Error al obtener todos: ' + error.message);
    }
  };

  existeUsuarioEnEmergencia = async (emergency_id, user_id) => {
    try {
      const todos = await Attend.findAll({
        where: {emergency_id, user_id}
      });
      return !!todos;
    } catch (error) {
      throw new Error('Error al obtener: ' + error.message);
    }
  };

}



module.exports = new AttendCtrl();
