const express = require("express");
const router = express.Router();
const userRepository = require("../data/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
const verificarToken = require("./verificarToken");

router.post("/login", async (req, res, next) => {
   const { email, password } = req.body;
   const user = await userRepository.getByEmail(email);

   if (!user) {
      return res.status(404).send(`No existe usuario con mail: ${email}`);
   }
   console.log(user.password)
   const passValida = await userRepository.validarPasswordBcrypt(email, password);

   if (!passValida) {
      return res.status(404).send(`Contraseña incorrecta`);
   }
   const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: "7d" });
   res.json({ autorizacion: true, token: token, mensaje: "Sesión inciada" });
});

router.post("/signin", async (req, res, next) => {
   const user = req.body;
   try {
      await userRepository.create(user);
      res.json({ autorizacion: true, mensaje: "Usuario registrado, inicie sesion para obtener un token" });
   } catch (error) {
      res.status(500).send(error);
   }
});

router.get("/:userId", verificarToken, async (req, res, next) => {
   const user = await userRepository.getById(req.params.userId);
   const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
   if (!user) {
      return res.status(404).send("Usuario no encontrado");
   }
   res.json({ usuario: user.username, token: token });
});

module.exports = router;
