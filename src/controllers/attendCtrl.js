const Attend = require('../models/attend');
const User = require('../models/user'); // Asegúrate de importar tus modelos correctamente
const ChargeCtrl = require('./chargeCtrl');
const UserCtrl = require('./userCtrl');
const moment = require('moment');

const {subirImagenABucket, compararRostros} = require('../services/aws');

class AttendCtrl {
  constructor() {}

  async getAttendsByEmergencyId(req, res){
    try{
      const { emergency_id } = req.params;
      const usuariosXEmergencia = await this.obtenerUsuariosPorEmergencia(emergency_id)
      res.status(200).send(usuariosXEmergencia);
    }catch (error){
      console.log(error);
      res.status(500).send("Error al obtener " + error.message);
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
      for (const usuario of usuarios) {
        const targetImage = usuario.url_image.split('/').pop();  
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
          }
        }
      }

      const usuariosXEmergencia = await this.obtenerUsuariosPorEmergencia(emergency_id)
      res.status(200).send(usuariosXEmergencia);
    }catch (error){
      console.log(error);
      res.status(500).json("Error al cargar la imagen");
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
      const existeUsuario = await Attend.findOne({
        where: {
          emergency_id: emergency_id,
          user_id: user_id
        }
      });
      return existeUsuario !== null; 
    } catch (error) {
      throw new Error('Error al verificar existencia de usuario en emergencia: ' + error.message);
    }
  };


  async obtenerUsuariosPorEmergencia(emergency_id) {
    try {
      const attends = await Attend.findAll({
        where: { emergency_id: emergency_id }
      });

      var usuarios = [];
      for (const attend of attends) {
        const nuevo = await UserCtrl.buscarPorId(attend.user_id);
        usuarios.push(nuevo);
      }

      return usuarios;
    } catch (error) {
      throw new Error('Error al verificar: ' + error.message);
    }
  }


}



module.exports = new AttendCtrl();
