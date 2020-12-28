const express = require("express");
const router = express.Router();
const usuariosController= require("../controllers/usuarios.controller")

router.get("/getUsuarios",usuariosController.getUsuarios);
router.post("/registro",usuariosController.addUsuario);
router.post("/login",usuariosController.ingresar);

module.exports = router