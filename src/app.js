import '../database/connection.js'
import "dotenv/config"
import express from "express"
import countryRoutes from "./routes/countryRoutes.js"
import favoriteRoutes from "./routes/favoriteRoutes.js"

const app = express()

app.use(express.json())

const port = 3000

app.listen(port, () => {
    console.log("Servidor Funcionando!")
})

app.get("/", (req, res) => {
    res.send("Api Funcionando")
})

app.use(countryRoutes)
app.use(favoriteRoutes)