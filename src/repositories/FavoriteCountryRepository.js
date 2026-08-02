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

export { createCountry , getAllCountries , getCountryById, getCountryByName}
