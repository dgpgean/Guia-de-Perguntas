// criando tabela no banco de dados

const Sequelize = require('sequelize')
const conection = require('./dataBase')

const Pergunta = conection.define('pergunta',{
            title:{
                type: Sequelize.STRING,
                allowNull: false // impede do campo ser nulo
            },
            description:{
                type:Sequelize.TEXT,
                allowNull:false
            }
})

Pergunta.sync({force:false}).then(()=>{})

module.exports = Pergunta