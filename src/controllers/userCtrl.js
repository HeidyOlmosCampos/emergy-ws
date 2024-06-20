const User = require('../models/user')

class UserCtrl {
  constructor() {}

  async getAll(req, res){
    try{
      const usuarios = await this.obtenerTodos();

      res.status(200).send(usuarios);

    }catch (error){
      console.log(error);
      res.status(500).send("Error al cargar la imagen");
    }
  }
  

  obtenerTodos = async () => {
    try {
      const todos = await User.findAll();
        return todos;
    } catch (error) {
        throw new Error('Error al obtener todos: ' + error.message);
    }
  };

  async buscarPorId(userId) {
    try {
      const usuario = await User.findByPk(userId);
      if (!usuario) {
        throw new Error(`Usuario con id ${userId} no encontrado`);
      }
      return usuario;
    } catch (error) {
      throw new Error('Error al buscar usuario por id: ' + error.message);
    }
  }

}



module.exports = new UserCtrl();
