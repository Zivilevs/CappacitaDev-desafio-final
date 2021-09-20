const { databaseConnection } = require('./connection')

async function createDatabase() {
    await databaseConnection.raw('CREATE DATABASE genresZVS').then( function() {
        databaseConnection.destroy()
        databaseConnection.connection.database = 'genresZVS'
    })
}
//createDatabase()

 function createTable() {
    databaseConnection.schema.hasTable('genre').then(function(exists) {
        if (!exists) {
            databaseConnection.schema.createTable('genre', function(table) {
            table.increments('id').primary();
            table.string('name', 100);
            table.integer('genre_id');
            table.integer('count');
          });
        }
      })
    }
//createTable()

async function salvarGenre(genre) {
    let result = false
    console.log("databaseKnex", genre)
    const insertGenre = {
        nome: genre.nome,
        genre_id: genre.genre_id,
    }
    console.log("entra no db", insertGenre)
    try {
        result = await databaseConnection('genre').insert(insertGenre)
        console.log(result)
    } catch (err) {
        console.log("Something with connection")
        console.error(err);
    }
    if(result){
        return{
            ...genre
        }
    } else {
        console.log("error")
    }

}

async function selectTopGenres() {
    let result = false
    try {
    const selected = `SELECT nome, COUNT(*) AS count FROM genre GROUP BY nome ORDER BY count DESC LIMIT 5`
    result = await databaseConnection.raw(selected)

    console.log(result[0])
    } catch (err) {
        console.log(err)
    }
    if(result){
        return result[0]
    } else {
        return console.log("errou")
    }
}
module.exports = { salvarGenre, selectTopGenres }