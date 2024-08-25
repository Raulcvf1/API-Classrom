//importa o framework express.
const express = require('express');

//importa o driver do mysql
const mysql = require('mysql');

const rotas_professores = require('./rotas/rotas_professores');  //module you want to include
const rotas_turmas = require('./rotas/rotas_turmas');  //module you want to include
const rotas_disciplinas = require('./rotas/rotas_disciplinas');  //module you want to include
const rotas_alunos = require('./rotas/rotas_alunos');  //module you want to include
const rotas_notas = require('./rotas/rotas_notas');  //module you want to include
const rotas_revisoes = require('./rotas/rotas_revisoes');  //module you want to include
const rotas_historicos = require('./rotas/rotas_historicos');  //module you want to include

//inicia o expresse na variável app;
const app = express();

//O express permite que sejam enviados arquivos. js para o front-end
app.use(express.static('js'));

//quando for enviado um texto json no corpo da requisição o expresse irá transformar isso em um objeto json
//em request.body, ou seja request.body é um objeto json contendo o texto json recebido no corpo da requisição.
app.use(express.json())

// acesse no navegador os arquivos na pasta /view da seguinte forma: http://localhost:3000/view/arquivo.html
//app.use('/view', express.static(__dirname + '/view'));


// acesse no navegador os arquivos na pasta /view da seguinte forma: http://localhost:3000/arquivo.html
//voce pode suprimir a pasta view do cliente, mas a pasta deve existir normalmente e
//seus arquivos estáticos serão posicionados nela.
app.use('/', express.static(__dirname + '/view'));

//define a porta que a aplicação web irá rodar.
const porta = 8080;

const host ="http://localhost:"+ porta;

//cria até 128 conexões com o banco de dados em forma de pool
/*
 O pool de conexões gerencia automaticamente um conjunto predefinido de conexões ativas. 
 Quando você precisa executar uma consulta com o banco de dados, você solicita uma conexão do pool.
 Após a conclusão da consulta, a conexão é liberada de volta para o pool, em vez de ser encerrada.
  Isso minimiza o custo de criação e encerramento e criação de conexões melhorando o desempenho geral
*/
var banco = mysql.createPool({
  connectionLimit: 128,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'colegiosunivap'
});

//configuração de conexão com o banco de dados
rotas_professores(app, banco);
rotas_turmas(app, banco);
rotas_disciplinas(app, banco);
rotas_alunos(app, banco);
rotas_notas(app, banco);
rotas_revisoes(app, banco);
rotas_historicos(app, banco);

//inicia o servidor da aplicação.
//para rodar a aplicação instale o banco de dados que está na pasta modelo
// rode no terminal node app.js 
app.listen(porta, function () {
  console.log('Servidor Ativo na porta: ' + porta + '!');
  console.log("Acesse: " + host + "/Login.html")
});

module.exports = app; 