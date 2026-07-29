import sqlite3 from 'sqlite3'

const db = new sqlite3.Database("./database/database.sqlite",(erro) => {
    if (erro){
        console.error('Erro ao conectar ao banco sqlite:' , erro.message)
    } else{
        console.log('Conectando ao banco SQLite com sucesso!')
    }
});

db.run(` 
    CREATE TABLE IF NOT EXISTS FavoriteCountry (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Nome TEXT NOT NULL,
        Capital TEXT,
        Regiao TEXT,
        Populacao INTEGER,
        DataCadastro TEXT DEFAULT CURRENT_TIMESTAMP

    )
`, (erro) => {
    if(erro){
        console.error('Erro ao criar tabela', erro.message)
    } else{
        console.log('Tabela FavoriteCountry pronta')
     }
})



export default db
