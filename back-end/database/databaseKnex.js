const { databaseConnection } = require(`./connection`)

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
    const insertGenre = {
        nome: genre.nome,
        genre_id: genre_id,
    }
    try {
        //const qyeryInsertGenreAndCount = `INSERT INTO genre (nome, genre_id, count) VALUES ('${genre.nome}','${genre.genre_id}')`
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
module.exports = {salvarGenre}