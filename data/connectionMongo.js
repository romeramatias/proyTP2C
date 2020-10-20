//const mongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');
const { MongoClient } = require('mongodb');

// TODO: Crear variables de entorno, sacar el harcodeo
const uriMongo = 'mongodb+srv://admin:yattp2@cluster0.noihx.azure.mongodb.net/sample_tp2?retryWrites=true&w=majority';

const client = new MongoClient(uriMongo, {useUnifiedTopology: true, useNewUrlParser:true})

async function getConnection(){
    return await client.connect().catch(err => console.log(chalk.red(err)));
}

module.exports = {getConnection};