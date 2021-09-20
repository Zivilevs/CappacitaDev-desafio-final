# Desafio final -- **The Movie Database (TMDb)** 

#### 							From Zero to Hero  with  CappacitaDev

### Descrição do desafio:	

Com base em todo o conhecimento adquirido em nosso curso #CappacitaDev, você precisa criar uma **interface gráfica que apresente pelo menos uma lista de filmes ou séries**, com tela de detalhes chamando pelo menos **dois serviços do TMDb**. É importante que você desenvolva o **backend** em **NodeJS** e utilize o **banco de dados MySQL**. Crie suas **próprias APIs** para consumir as APIs da TMDb.

### Implementação:

#### 1. Serviços TMDB

  		1.  Serviço de lista de fgêneros de filmes  "https://api.themoviedb.org/3/genre/movie/list"
  		2.  serviço de lista de filmes por gênero e repetindo as chamandas para a paginação "https://api.themoviedb.org/3/discover/movie?with_genre=genre_id&page=num"
  		3.  Serviço de detalhes de filme "https://api.themoviedb.org/3/movie/"		

#### 2. Backend em NodeJS

​	Arquivos `server.js`e `scripts.js`.  (Ultimo precisando da refactor e limpeza)

​	Principal backend framework `expess.js`

​	Uso de `axios`, tratamento de `status code `

#### 3. Interface gráfica

​	`index.html`e `style.css`

​	A tela de detalhes foi implementada usando `css`animação, sobrepondo o div com info de API de detalhes em cima do div com infos vindos da API da lista de filmes.

#### 3. MySQL

​	Com client `mysql2`e `knex`feita conexção com banco de dados MySQL.

#### 4.Próprias APIs

	1. `POST` --> Quando visitante escolha um gênero de filme, escolha dele é mandada pela API para banco de dados e registrada. (API funcionando)
	2. `GET` -->  Retira os dados do MySQL fazendo contagem por gênero e mostra os 5 mais populares gêneros no site. (API funciona, mas precisar terminar implementação no front end)

#### 5. Bonus

	1.  uso de `dotenv`
	2.   frontend com o  uso do cartão animado pela CSS

### Iniciar o projeto

##### Dependências do projeto

  "dependencies": {

​    "axios": "^0.21.4",

​    "body-parser": "^1.19.0",

​    "browserify": "^17.0.0",

​    "cors": "^2.8.5",

​    "dotenv": "^10.0.0",

​    "express": "^4.17.1",

​    "knex": "^0.95.11",

​    "mysql2": "^2.3.0"

  }

Express.js usa `port: 3003`

Depois resolvidas as dependências:

`npm start back-end/server.js `  ( ou usar `nodemon` com `npm run dev`)

#### Para MySQL funcionar precisa criar uma database e uma tabela

​	`port` : '3306'

​	`database`:  ‘genresZVS’  , `

`(CREATE DATABASE genresZVS;)`

​	`table schema:`

 (`CREATE TABLE `genresZVS`.`genre1` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `genre_id` INT NULL,
  `created_at` DATETIME NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);`)



