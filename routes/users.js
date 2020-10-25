const express = require("express");
const router = express.Router();
const dataUsers = require("../data/User");
const jwt = require("jsonwebtoken");
const config = require("../config");
const userData = require("../data/User");
const verificarToken = require("./verificarToken");

router.post("/identificarse", async (req, res, next) => {
   const { email, password } = req.body;
   const user = await userData.getUserEmail(email);

   if (!user) {
      return res.status(404).send(`No existe usuario con mail: ${email}`);
   }
   const passValida = await userData.validarPassBcrypt(email, password);

   if (!passValida) {
      return res.status(404).send(`Contraseña incorrecta`);
   }

   const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: "7d" });

   res.json({ autorizacion: true, token: token, mensaje: "Sesión inciada" });
});

router.post("/registrarse", async (req, res, next) => {
   const user = req.body;
   try {
      await dataUsers.pushUser(user);
      res.json({ autorizacion: true, mensaje: "Usuario registrado, inicie sesion para obtener un token" });
   } catch (error) {
      res.status(500).send(error);
   }
});

router.get("/miusuario", verificarToken, async (req, res, next) => {
   const user = await userData.getUserId(req.userId);
   const token = req.headers["x-access-token"];

   if (!user) {
      return res.status(404).send("Usuario no encontrado");
   }

   res.json({ usuario: user.username, token: token });
});

module.exports = router;
