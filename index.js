const express = require("express");
const http = require("http");
const cors = require("cors");
const morgan = require('morgan'); //Middleware de registro de solicitudes HTTP para node.js
const bodyparser = require("body-parser");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// settings
app.set("port", process.env.PORT || 5000);
var corsOpt = {
  origin: "*",
};
app.use(cors(corsOpt));
app.use(morgan('dev'));

app.use(bodyparser.urlencoded({ limit: "15mb", extended: true }));
app.use(bodyparser.json({ limit: "15mb" }));

// routes
app.use("/image", require("./src/routes/imagenRoute"));

// Start Server
const startServer = async () => {
  try {

    server.listen(app.get("port"), '0.0.0.0', () => {
      console.log("Taller mecanico servicio en el puerto ", app.get("port"));
    });

  } catch (error) {
    console.error("Error al levantar el servidor:", error);
  }
};

startServer();



