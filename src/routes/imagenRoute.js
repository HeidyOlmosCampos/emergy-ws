const express = require('express');
const multer = require('multer');
const ImagenCtrl = require('../controllers/imagenCtrl')

const router = express.Router();


// Configuración de Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/upload', upload.single('image'), (req, res) => ImagenCtrl.subirImagen(req, res));

router.post('/compare', (req, res) => ImagenCtrl.compararRostros(req, res));







module.exports = router;

