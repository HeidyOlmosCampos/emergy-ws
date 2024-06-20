const Image = require('../models/image');
const moment = require('moment');
const {subirImagenABucket, compararRostros} = require('../services/aws');

class ImagenCtrl {
  constructor() {}

  async subirImagen(req, res){
    try{
      const imagen = req.file.buffer;
      const nombreArchivo = `${Date.now()}_${req.file.originalname}`
      await subirImagenABucket(imagen, nombreArchivo)
      .then((url) => {
        res.status(200).send({
          url: url,
          nombre: nombreArchivo
        });
      })
      .catch(() => {
        res.status(500).send({ error: error.message });
      });
    }catch (error){
      res.status(500).send({ error: error.message });
    }
  }

  async compararRostros(req, res){
    try{
      const sourceImage = "1718858069085_1.jpg";
      const targetImage = "1718858046203_2.jpg";
      await compararRostros(sourceImage, targetImage)
      .then((similtud) => {
        res.status(200).send({
          similtud
        });
      })
      .catch(() => {
        res.status(500).send({ error: error.message });
      });
    }catch (error){
      res.status(500).send({ error: error.message });
    }
  }

  async subirImagenEmergencia(req, res){
    try{
      const imagen = req.file.buffer;
      const emergencyId = req.body.emergencyId;
      const description = "imagen de emergencia con id " + emergencyId;
      const nombreArchivo = `${Date.now()}_${req.file.originalname}`;
      var imgURL = "";
      await subirImagenABucket(imagen, nombreArchivo)
      .then((url) => {
        imgURL = url;
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });

      const nuevo = await this.crear(description, imgURL, emergencyId);
      res.status(200).send(nuevo);
    }catch (error){
      res.status(500).send({ error: error.message });
    }
  }


  async obtenerUrlDeImgEmergencia(req, res){
    try {
      const { emergency_id } = req.params;
      const urls = await this.obtenerUrlPorEmercenciaId(emergency_id);
      res.status(200).send(urls);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



  async crear(description, url_image, emergency_id) {
    try{
      const now = moment(); // Obtiene la fecha y hora actuales
      const nuevo = await Image.create({
        description,
        date: now.format('YYYY-MM-DD'), // Formato de fecha: AAAA-MM-DD
        hour: now.format('HH:mm'), // Formato de hora: HH:MM
        url_image,
        emergency_id
      });
    
      return nuevo;
    }
    catch (error){
      console.log(error);
    }
  }

  obtenerUrlPorEmercenciaId = async (emergency_id) => {
    try {
      const images = await Image.findAll({
        where: { emergency_id },
        attributes: ['url_image'] // Selecciona solo el campo 'url_image'
      });

      // Extrae solo las URLs de las imágenes
      const urls = images.map(image => image.url_image);
      return urls;
    } catch (error) {
      throw new Error('Error al obtener las URLs de las imágenes: ' + error.message);
    }
  };

}

module.exports = new ImagenCtrl();
