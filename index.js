const express = require('express')
const app = express()
const conection = require('./dataBse/dataBase')
const perguntas = require('./dataBse/perguntas')
const resposta = require('./dataBse/resposta')

//conexao
conection.authenticate().then(()=>{
    console.log('Conexão realizada!')
}).catch((erro)=>{
    console.log(erro)   
})


app.set("view engine","ejs")
app.use(express.static("public"))

// converter os dados do formulario para ler no node
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//rotas
app.get('/',(req,res)=>{
    perguntas.findAll({raw:true, order:[
        ['id','DESC'] // nome do campo da tabela + ASC = CRECENTE ou DESC = descrecente
    ]}).then(perguntas1 =>{ //aqui busca os dados da tabela perguntas
        res.render('index',{
            pergunta: perguntas1
        })
    })
    
})

app.get('/perguntar',(req,res)=>{
    res.render('perguntar')
})

app.post('/salvarpergunta',(req,res)=>{
    const titulo = req.body.titulo // pega os dados do formulario
    const desc = req.body.descricao
    perguntas.create({
        title:titulo,
        description:desc
    }).then(()=>{
        res.redirect('/')
    })
})

app.get('/pergunta/:id',(req,res)=>{
    const id = req.params.id
    perguntas.findOne({
        where:{id:id}
    }).then(pergunta =>{
        if(pergunta!=undefined){

            resposta.findAll({
                where:{perguntaID:pergunta.id},
                order:[['id','DESC']]
            }).then(respostas=>{
                res.render('perguntas',{
                    pergunta:pergunta,
                    respostas:respostas
                })
            })       
        }else{
            res.redirect('/')
        }
    })
})

app.post('/responder',(req,res)=>{
    const corpo = req.body.corpo
    const perguntaId = req.body.pergunta

    resposta.create({
        corpo:corpo,
        perguntaID: perguntaId
    }).then(()=>{
        res.redirect('/pergunta/'+perguntaId)
    })
})
app.listen(8080,()=>{
    console .log('app rodando')
})

