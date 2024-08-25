
//app e banco são recebidos quando fazemos a chamada

const Turma = require("../modelo/Turma");

// de rotas_funcionarios
module.exports = function (app, banco) {
  
    /*************************************************************************************************************************** */
    //create
    app.post('/turma', (request, response) => {
      
      const nome = request.body.nome;
      const abreviacao = request.body.abreviacao;
      const ano = request.body.ano;
  
      const turma = new Turma(banco);

      turma.setNome(nome);
      turma.setAbreviacao(abreviacao);
      turma.setAno(ano);

      turma.create().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Executado com sucesso',
          codigo: '004',
          dados: {
            idTurma: resultadosBanco.insertId,
            nome: turma.getNome(),
            abreviacao: turma.getAbreviacao(),
            ano: turma.getAno()
          }
        }
        response.status(200).send(resposta);
      }).catch((erro) => {
        console.error('Error retrieving users:', erro);
      });;
  
    });
  
  
    /**
     * 
     * read
     * 
     */
    app.get('/turma', function (request, response) {
  
        const turma = new Turma(banco);
  
        turma.read().then((resultadosBanco) => {
  
        const resposta = {
          status: true,
          msg: 'Executado com sucesso',
          dados: resultadosBanco
        };
  
        response.status(200).send(resposta);
      }).catch((erro) => {
        const resposta = {
          status: false,
          msg: 'erro ao executar',
          dados: erro
        };
        response.status(200).send(resposta);
  
      });;
    });
  
  
    app.get('/turma/:id/', (request, response) => {
  
        const turma = new Turma(banco);
  
        const idTurma = request.params.id;

        turma.setIdturma(idTurma);

        turma.read().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'executado com sucesso',
          dados: resultadosBanco
        };
        response.status(200).send(resposta);
      }).catch((erro) => {
  
        const resposta = {
          status: false,
          msg: 'erro ao executar',
          codigo: '005',
          dados: erro,
        }
        response.status(200).send(resposta);
  
      });;
  
    });

    app.get('/turma/notaaluno/:id/', (request, response) => {
  
      const turma = new Turma(banco);

      const idTurma = request.params.id;

      turma.setIdturma(idTurma);

      turma.read_notas_alunos_turma().then((resultadosBanco) => {
      const resposta = {
        status: true,
        msg: 'executado com sucesso',
        dados: resultadosBanco
      };
      response.status(200).send(resposta);
    }).catch((erro) => {

      const resposta = {
        status: false,
        msg: 'erro ao executar',
        codigo: '005',
        dados: erro,
      }
      response.status(200).send(resposta);

    });;

  });

    /**
     * update
     */
    app.put('/turma/:id', (request, response) => {
  
        const idTurma = request.params.id;
        const nome = request.body.nome;
        const abreviacao = request.body.abreviacao;
        const ano = request.body.ano;
    
        const turma = new Turma(banco);
  
        turma.setIdturma(idTurma);
        turma.setNome(nome);
        turma.setAbreviacao(abreviacao);
        turma.setAno(ano);
  
      turma.update().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Executado com sucesso',
          codigo: '004',
          dados: {
            idTurma: resultadosBanco.insertId,
            nome: turma.getNome(),
            abreviacao: turma.getAbreviacao(),
            ano: turma.getAno()
          }
        }
        response.status(200).send(resposta);
      }).catch((erro) => {
        console.error('Error retrieving users:', erro);
      });;
  
    });
  
  
    /**
     * delete
     */
    app.delete('/turma/:id', (request, response) => {
  
      const idTurma = request.params.id;

      const turma = new Turma(banco);

      turma.setIdturma(idTurma);
  
      turma.delete().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '004',
          dados: {
            idTurma: turma.getIdturma(),
          }
        }
        response.status(200).send(resposta);
      }).catch((erro) => {
        console.error('Error retrieving users:', erro);
      });;
  
    });
  };