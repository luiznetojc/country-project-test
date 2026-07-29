import '../database/conexao.js'
import express from "express"


const app = express()

const porta = 3000


app.listen(porta , () =>{
    console.log("Servidor Funcionando!")
})

app.get("/", (req,res) => {
    res.send("Api Funcionando")
})
