import sqlite3 from 'sqlite3'

const db = new sqlite3.Database("./database/database.sqlite",(error) => {
    if (error){
        console.error('Erro ao conectar ao banco sqlite:' , error.message)
    } else{
        console.log('Conectando ao banco SQLite com sucesso!')
    }
});

db.run(` 
    CREATE TABLE IF NOT EXISTS FavoriteCountry (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Capital TEXT,
        Region TEXT,
        Population INTEGER,
        DateRegistration TEXT DEFAULT CURRENT_TIMESTAMP

    )
`, (error) => {
    if(error){
        console.error('Erro ao criar tabela', error.message)
    } else{
        console.log('Tabela FavoriteCountry pronta')
     }
})



export default db
