
//app e banco são recebidos quando fazemos a chamada

const Disciplina = require("../modelo/Disciplina");

// de rotas_funcionarios
module.exports = function (app, banco) {

    const Professor = require("../modelo/Professor");
    const Turma = require('../modelo/Turma');
  
    /*************************************************************************************************************************** */
    //create
    app.post('/disciplina', (request, response) => {
      
      const nome = request.body.nome;
      const Professor_registro = request.body.Professor_registro;
      const Turma_idTurma = request.body.Turma_idTurma;
  
      const disciplina = new Disciplina(banco);
      disciplina.setNome(nome);

      const professor = new Professor(banco);
      professor.setRegistro(Professor_registro);

      disciplina.setProfessor(professor);

      const turma = new Turma(banco);
      turma.setIdturma(Turma_idTurma);

      disciplina.setTurma(turma);

      console.log("ESTOU AQUI")

      disciplina.create().then((resultadosBanco) => {

        const prof = disciplina.getProfessor();

        const turma = disciplina.getTurma();

        const resposta = {
          status: true,
          msg: 'Executado com sucesso',
          codigo: '004',
          dados: {
            idDisciplina: resultadosBanco.insertId,
            nome: disciplina.getNome(),
            Professor_registo: prof.registro,
            Turma_idTurma: turma.idTurma
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
    app.get('/disciplina', function (request, response) {
  
        const disciplina = new Disciplina(banco);
  
        disciplina.read().then((resultadosBanco) => {
  
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
  
  
    app.get('/disciplina/:id/', (request, response) => {

        const idDisciplina = request.params.id;

        const disciplina = new Disciplina(banco);
  
        disciplina.setIddisciplina(idDisciplina);

        disciplina.read().then((resultadosBanco) => {
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
     * read professor id
     */

    app.get('/disciplina/prof/:idProf/:idTurma', (request, response) => {

      const Professor_registro = request.params.idProf;
      const Turma_idTurma = request.params.idTurma;

      const disciplina = new Disciplina(banco);

      const professor = new Professor(banco);
      professor.setRegistro(Professor_registro);

      disciplina.setProfessor(professor);

      const turma = new Turma(banco);
      turma.setIdturma(Turma_idTurma);

      disciplina.setTurma(turma);

      disciplina.read_professor_id().then((resultadosBanco) => {
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
    app.put('/disciplina/:id', (request, response) => {
      
      const idDisciplina = request.params.id;
      const nome = request.body.nome;
      const Professor_registro = request.body.Professor_registro;
      const Turma_idTurma = request.body.Turma_idTurma;
  
      const disciplina = new Disciplina(banco);
      disciplina.setIddisciplina(idDisciplina);
      disciplina.setNome(nome);
      

      const professor = new Professor(banco);
      professor.setRegistro(Professor_registro);

      disciplina.setProfessor(professor);

      const turma = new Turma(banco);
      turma.setIdturma(Turma_idTurma);

      disciplina.setTurma(turma);
  
      disciplina.update().then((resultadosBanco) => {

        const prof = disciplina.getProfessor();

        const turma = disciplina.getTurma();

        const resposta = {
          status: true,
          msg: 'Executado com sucesso',
          codigo: '004',
          dados: {
            idDisciplina: disciplina.getIddisciplina(),
            nome: disciplina.getNome(),
            Professor_registo: prof.registro,
            Turma_idTurma: turma.idTurma
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
    app.delete('/disciplina/:id', (request, response) => {
  
      const idDisciplina = request.params.id;

      const disciplina = new Disciplina(banco);

      disciplina.setIddisciplina(idDisciplina);
  
      disciplina.delete().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '004',
          dados: {
            idDisciplina: disciplina.getIddisciplina(),
          }
        }
        response.status(200).send(resposta);
      }).catch((erro) => {
        console.error('Error retrieving users:', erro);
      });;
  
    });
  };