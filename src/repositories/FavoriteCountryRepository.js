import db from '../../database/connection.js'

function createCountry(country,callback){
    const sql = `INSERT INTO FavoriteCountry (Nome,Capital,Regiao,Populacao) VALUES (?, ?, ?, ?)`
    db.run(sql, [country.nome,country.capital,country.regiao,country.populacao], function(error){
        if(error){
            callback(error,null)
        } else{
            callback(null, { id: this.lastID,...country})
        }
    })
}

function getAllCountries(callback){
    db.all('SELECT * FROM FavoriteCountry', [], (error, rows) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, rows)
        }
    })
}

export { createCountry, getAllCountries}
