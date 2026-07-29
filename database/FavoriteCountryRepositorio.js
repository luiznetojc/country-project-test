import db from './conexao.js'

function criarPais(pais,callback){
    const sql = `INSERT INTO FavoriteCountry (Nome,Capital,Regiao,Populacao) VALUES (?, ?, ?, ?)`
    db.run(sql, [pais.nome,pais.capital,pais.regiao,pais.populacao], function(erro){
        if(erro){
            callback(erro,null)
        } else{
            callback(null, { id: this.lastID,...pais})
        }
    })
}

function listarPaises(callback){
    db.all('SELECT * FROM FavoriteCountry', [], (erro, linhas) => {
        if (erro) {
            callback(erro, null)
        } else {
            callback(null, linhas)
        }
    })
}

export { criarPais, listarPaises}