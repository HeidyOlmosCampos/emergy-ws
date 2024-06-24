const Action = require('../models/action');
const moment = require('moment');
const {textoABitacora} = require('../services/geminiAi')

class ActionCtrl {
  constructor() {}

  async createActions(req, res){
    try{
      const promtEntrante = req.body.promt;
      const emergency_id = req.body.emergency_id;
      var resultado = "";
      if(promtEntrante.length > 5){
        resultado = await textoABitacora(promtEntrante);
        console.log(resultado);
        const partes1 = resultado.split('@');
        for(const part of partes1) {
          const partesEvento = part.split('_').map(item => item.trim()).filter(item => item !== ''); // Elimina espacios en blanco y elementos vacíos

          if (partesEvento.length < 3) {
            continue; // Si no hay suficientes elementos, pasa al siguiente bucle
          }

          const fecha = partesEvento[0]; // Formato "YYYY-MM-DD"
          const hora = partesEvento[1] + ":00"; // Formato "HH:MM"
          const descripcion = partesEvento.slice(2).join('_'); // Unir las partes restantes con '_'

          const dateObject = new Date(fecha);
          const nuevo = await Action.create({
            date: dateObject,
            hour: hora,
            description: descripcion,
            emergency_id: emergency_id
          });
        }
      }
      const todos = await this.obtenerTodosPorEmergenciaId(emergency_id);
      console.log(todos.toString());

      res.status(200).json(todos);

    }catch (error){
      console.log(error);
      res.status(500).send("Error al cargar la imagen");
    }
  }

  async getAllByEmergencyId(req, res){
    try{
      const { emergency_id } = req.params;
      const todos = await this.obtenerTodosPorEmergenciaId(emergency_id);

      res.status(200).send(todos);

    }catch (error){
      console.log(error);
      res.status(500).send("Error al cargar la imagen");
    }
  }

  

  obtenerTodosPorEmergenciaId = async (emergency_id) => {
    try {
        const todos = await Action.findAll({
          where: { emergency_id: emergency_id }
        });
        return todos;
    } catch (error) {
        throw new Error('Error al obtener todos: ' + error.message);
    }
  };


}



module.exports = new ActionCtrl();
