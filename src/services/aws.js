const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION, // por ejemplo, 'us-east-1'
});

AWS.config.getCredentials(function (err) {
  if (err) console.log("Error de credenciales, no se puede conectar a AWS");
  else {
    console.log("Credenciales correctas, conectado a AWS");
  }
});


// Función para comparar dos imágenes usando Rekognition
const rekognition = new AWS.Rekognition();
function compararRostros(sourceImage, targetImage) {
  const bucketName = process.env.BUCKET_NAME;
  const params = {
    SourceImage: {
      S3Object: {
        Bucket: bucketName,
        Name: targetImage, // Nombre del archivo de la imagen fuente en S3
      },
    },
    TargetImage: {
      S3Object: {
        Bucket: bucketName,
        Name: sourceImage, // Nombre del archivo de la imagen objetivo en S3
      },
    },
    SimilarityThreshold: 0 // Establece la sensibilidad a 0
  };

  return new Promise((resolve, reject) => {
    rekognition.compareFaces(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        const faceMatches = data.FaceMatches;
        if (faceMatches.length === 0) {
          resolve(0);
        } else {
          console.log(faceMatches);
          const similarity = faceMatches[0].Similarity;
          resolve(similarity);
        }
      }
    });
  });
}


// Función para subir imagen a S3
const s3 = new AWS.S3();
function subirImagenABucket(buffer, key) {
  const bucketName = process.env.BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Key: key, // Nombre del archivo en S3
    Body: buffer, // Imagen en formato buffer
    ContentType: 'image/jpeg', // Cambia el tipo MIME si es necesario
    ACL: 'public-read', // Esto hace que la imagen sea pública
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        resolve(data.Location); // URL de la imagen subida
      }
    });
  });
}


module.exports = {
  subirImagenABucket,
  compararRostros
};
