const express = require("express");
const router = express.Router();
const inventorsRepository = require("../data/Inventor");

// GET Todos los inventores
router.get("/", async (req, res) => {
   const data = await inventorsRepository.getAll();
   res.json(data);
});

// GET Un inventor
router.get("/:id", async (req, res) => {
   const inventor = await inventorsRepository.getById(req.params.id);
   if(inventor!=null){
      res.json(inventor);
   }else{
      res.status(404).send("No se ha encontrado el inventor bajo el id ingresado")
   }
});

// Agregar un inventor
router.post("/", async (req, res) => {
   const inventor = req.body;
   try {
      const result = await inventorsRepository.create(inventor);
      if(result.insertedCount == 1){
         res.status(201).send("El inventor fue creado exitosamente");
      }else{
         res.status(500).send("Se produjo un error al intentar crear el inventor");
      }
   } catch (error) {
      res.status(500).send(error);
   }
});

// Modificacion de inventor
router.put("/:id", async (req, res) => {

   let inventor = await inventorsRepository.getById(req.params.id);
   if(inventor!=null){
      inventor = req.body;
      try {
         inventor._id = req.params.id;
         const result = await inventorsRepository.update(inventor);
         if(result.modifiedCount === 1){
            res.send("El inventor fue actualizado exitosamente");
         }else{
            res.status(500).send("Se produjo un error al intentar actualizar el inventor con el id ingresado");
         }
         res.json(result);
      } catch (error) {
         res.status(500).send(error);
      } 
   }else{
      res.status(404).send("No se ha encontrado el inventor bajo el id ingresado")
   } 
});

// Eliminacion de inventor
router.delete("/:id", async (req, res) => {
   const inventor = await inventorsRepository.getById(req.params.id);
   if(inventor!=null){
      try {
         const result = await inventorsRepository.removeById(req.params.id);
         if(result.deletedCount === 1){
            res.send("El inventor con id " + req.params.id + " fue removido exitosamente");

         }else{
            res.status(500).send("Se produjo un error al intentar eliminar el inventor con el id ingresado");
         }
       } catch (error) {
         res.status(500).send(error);
      }
   }else{
      res.status(404).send("No se ha encontrado el inventor bajo el id ingresado")
   } 
});

module.exports = router;
