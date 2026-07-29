import '../database/connection.js'
import express from "express"


const app = express()

const port = 3000


app.listen(port , () =>{
    console.log("Servidor Funcionando!")
})

app.get("/", (req,res) => {
    res.send("Api Funcionando")
})
