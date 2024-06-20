const Charge = require('../models/charge')

class ChargeCtrl {
  constructor() {}

  async getAll(req, res){
    try{
      //const charges = await this.obtenerTodos();
      const url = 'https://s3-imageshop.s3.amazonaws.com/1718863846096_25.jpg';
      const fileName = url.split('/').pop();
      console.log(fileName); // Output: '1718863846096_25.jpg'

      res.status(200).send(fileName);

    }catch (error){
      res.status(500).send("Error al cargar la imagen");
    }
  }
  

  obtenerTodos = async () => {
    try {
        const todos = await Charge.findAll();
        return todos;
    } catch (error) {
        throw new Error('Error al obtener todos: ' + error.message);
    }
  };

}



module.exports = new ChargeCtrl();
