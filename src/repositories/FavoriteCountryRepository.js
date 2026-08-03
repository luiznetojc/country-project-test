import db from '../../database/connection.js'

function createCountry(country,callback){
    const sql = `INSERT INTO FavoriteCountry (Name,Capital,Region,Population) VALUES (?, ?, ?, ?)`
    db.run(sql, [country.name,country.capital,country.region,country.population], function(error){
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

function getCountryById(id, callback){
    db.get('SELECT * FROM FavoriteCountry WHERE Id = ?', [id], (error, row) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, row)
        }
    })
}

function getCountryByName(name, callback){
    db.get('SELECT * FROM FavoriteCountry WHERE Name = ?', [name], (error, row) => {
        if (error) {
            callback(error, null)
        } else {
            callback(null, row)
        }
    })
}

function updateCountry(id, country, callback){
    const sql = `UPDATE FavoriteCountry SET Name = ?, Capital = ?, Region = ?, Population = ? WHERE Id = ?`
    db.run(sql, [country.name, country.capital, country.region, country.population, id], function(error){
        if(error){
            callback(error, null)
        } else if (this.changes === 0) {
            callback(null, null) // nenhum registro foi atualizado (ID não existe)
        } else {
            callback(null, { id: Number(id), ...country })
        }
    })
}

function deleteCountry(id, callback){
    const sql = `DELETE FROM FavoriteCountry WHERE Id = ?`
    db.run(sql, [id], function(error){
        if(error){
            callback(error, null)
        } else if (this.changes === 0) {
            callback(null, false) // nenhum registro deletado (ID não existe)
        } else {
            callback(null, true)
        }
    })
}

export { createCountry , getAllCountries , getCountryById, getCountryByName, updateCountry,deleteCountry}
