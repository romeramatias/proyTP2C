const connection = require("./connection-mongo");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");

async function pushUser(user) {
   const connectionMongo = await connection.getConnection();
   if (!user.hasOwnProperty("username") || !user.hasOwnProperty("email") || !user.hasOwnProperty("password"))
      throw "Campos faltantes";
   user.password = await encriptarPass(user.password);
   console.log(user);
   const resultado = await connectionMongo.db("ejemplo_tp2").collection("users").insertOne(user);
   return resultado;
}

async function getUserId(id) {
   const connectionMongo = await connection.getConnection();
   id = new ObjectId(id);
   const resultado = await connectionMongo.db("ejemplo_tp2").collection("users").findOne({ _id: id });
   return resultado;
}

async function getUserEmail(email) {
   const connectionMongo = await connection.getConnection();
   const resultado = await connectionMongo.db("ejemplo_tp2").collection("users").findOne({ email: email });
   return resultado;
}

async function validarPass(email, password) {
   const user = await this.getUserEmail(email);
   if (user.password === password) {
      return true;
   } else {
      return false;
   }
}

async function encriptarPass(password) {
   const salt = await bcrypt.genSalt(10);
   return bcrypt.hash(password, salt);
}

async function validarPassBcrypt(email, password) {
   userDB = await getUserEmail(email);
   console.log(password);
   return await bcrypt.compare(password, userDB.password);
}

module.exports = { pushUser, getUserId, getUserEmail, validarPass, validarPassBcrypt };
