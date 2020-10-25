// Middleware de verificar token
const config = require("../config");
const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
   const token = req.headers["x-access-token"];
   if (!token) {
      return res.status(401).json({ autorizacion: false, mensaje: "No hay ingresado un token" });
   }
   try {
      const tokenDecoded = jwt.verify(token, config.secret);
      req.userId = tokenDecoded.id;
   } catch (error) {
      return res.status(401).json({ autorizacion: false, mensaje: error });
   }

   next();
}

module.exports = verificarToken;
