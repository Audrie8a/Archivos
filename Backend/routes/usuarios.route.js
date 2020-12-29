const express = require("express");
const router = express.Router();
const usuariosController= require("../controllers/usuarios.controller")

router.get("/getProductos",usuariosController.getUsuario);
router.post("/crearProducto",usuariosController.addUsuario);
router.post("/cliente",usuariosController.ingresar);
router.get("/getFacturas",usuariosController.getReporte)

module.exports = router