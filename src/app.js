import '../database/connection.js'
import express from "express"
import { getCountry } from './controllers/countryController.js'
import 'dotenv/config'


const app = express()

const port = 3000


app.listen(port , () =>{
    console.log("Servidor Funcionando!")
})

app.get("/", (req,res) => {
    res.send("Api Funcionando")
})

app.get("/countries/:name",getCountry)
