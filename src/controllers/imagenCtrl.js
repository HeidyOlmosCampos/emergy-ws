const {subirImagenABucket, compararRostros} = require('../services/aws');
const ResponseResult = require("../models/responseResult");



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
        res.status(500).send("Error al cargar la imagen");
      });
    }catch (error){
      res.status(500).send("Error al cargar la imagen");
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
        res.status(500).send("Error al cargar la imagen");
      });
    }catch (error){
      res.status(500).send("Error al cargar la imagen");
    }
  }


}

module.exports = new ImagenCtrl();
