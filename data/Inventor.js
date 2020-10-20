const fs = require('fs').promises;
const PATH = __dirname + '/inventorsMOC.json';
const connection = require('./connectionMongo');

async function readMocInventor(){
    return JSON.parse( await fs.readFile(PATH, 'utf8'));
}

async function writeMocInventor(inventors){
    await fs.writeFile(PATH, JSON.stringify(inventors, null, ' '));
}

async function getAllInventors(){
    //return await readMocInventor();
    const connectionMongo = await connection.getConnection();

    const inventors = await connectionMongo.db('sample_tp2')
                        .collection('inventors')
                        .find()
                        .toArray();
    //console.log(inventors);
    return inventors;
}

async function getInventor(id){
    // const data = await readMocInventor();
    // const inventor = data.inventors.find(inventor => inventor._id == id);
    // return inventor;
    const connectionMongo = await connection.getConnection();
    const inventor = await connectionMongo.db('sample_tp2')
                        .collection('inventors')
                        .findOne({_id: parseInt(id) });
    return inventor;
}

async function pushInventor(inventor){
    // const data = await readMocInventor();
    // data.inventors.push(inventor);
    // await writeMocInventor(data);
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('sample_tp2')
                        .collection('inventors')
                        .insertOne(inventor);
    return result;
}

async function updateInventor(inventor){
    const connectionMongo = await connection.getConnection();
    const query = {_id: parseInt(inventor._id)}
    const newvalues = {
        $set: {
            first: inventor.first, last: inventor.last, year: inventor.year, img: inventor.img
        }
    }
    const result = await connectionMongo.db('sample_tp2')
                        .collection('inventors')
                        .updateOne(query, newvalues);
    return result;
}

async function deleteInventor(id){
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('sample_tp2')
                    .collection('inventors')
                    .deleteOne({_id: parseInt(id)});
    return result;
}

module.exports = {getAllInventors, getInventor, pushInventor, updateInventor, deleteInventor}