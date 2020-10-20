const express = require('express');
const router = express.Router();
const dataInventor = require('../data/Inventor');

/* Listado de todos los inventores */
router.get('/', async function(req, res) {
  const data = await dataInventor.getAllInventors();
  res.json(data);
});

/* Un inventor especifico */
router.get('/:id', async (req, res) => {
    // res.json el estatus es 200 por defecto
    res.json(await dataInventor.getInventor(req.params.id));
});

// Alta de inventor
router.post('/', async (req, res) =>{
    const inventor = req.body;
    try{
      const result = await dataInventor.pushInventor(inventor);
      //const inventorPersistido = await dataInventor.getInventor(inventor._id);
      res.json(result);
    }
    catch (error) {
      res.status(500).send(error);
    }
});

// Modificacion de inventor
router.put('/:id', (req, res) =>{

});

// Eliminacion de inventor
router.delete('/:id', (req, res)=>{

});

module.exports = router;