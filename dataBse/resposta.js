const Sequelize = require('sequelize')
const conection = require('./dataBase')

const resposta = conection.define('resposta',{
    corpo:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    perguntaID:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
})  

resposta.sync({force: false})

module.exports = resposta