const fs = require('fs').promises;
const PATH = __dirname + '/inventorsMOC.json';

async function readMocInventor(){
    return JSON.parse( await fs.readFile(PATH, 'utf8'));
}

async function writeMocInventor(inventors){
    await fs.writeFile(PATH, JSON.stringify(inventors, null, ' '));
}

async function getAllInventors(){
    return await readMocInventor();
}

async function getInventor(id){
    const data = await readMocInventor();
    const inventor = data.inventors.find(inventor => inventor._id == id);
    return inventor;
}

async function pushInventor(inventor){
    const data = await readMocInventor();
    data.inventors.push(inventor);
    await writeMocInventor(data);
}

function updateInventor(inventor){

}

function deleteInventor(id){

}

module.exports = {getAllInventors, getInventor, pushInventor, updateInventor, deleteInventor}