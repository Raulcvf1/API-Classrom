//app e banco são recebidos quando fazemos a chamada

const Nota = require("../modelo/Nota");

// de rotas_funcionarios
module.exports = function (app, banco) {
  const Disciplina = require("../modelo/Disciplina");
  const Aluno = require("../modelo/Aluno");

  /*************************************************************************************************************************** */
  //create
  app.post("/nota", (request, response) => {
    const Disciplina_idDisciplina = request.body.disciplina;
    const Aluno_matricula = request.body.aluno;
    const bimestre = request.body.bimestre;
    const nota_json = request.body.nota;
    const ultimaaAlteracao = request.body.data;
    const tipoNota = request.body.tipoNota;
    const fezLista = request.body.fezLista;

    console.log("ESTA AQUI EH O ID DA DISCPLINA " + Disciplina_idDisciplina);

    const nota = new Nota(banco);

    const disciplina = new Disciplina(banco);
    disciplina.setIddisciplina(Disciplina_idDisciplina);

    nota.setDisciplina(disciplina);

    const aluno = new Aluno(banco);
    aluno.setMatricula(Aluno_matricula);

    nota.setAluno(aluno);

    nota.setBimestre(bimestre);
    nota.setNota(nota_json);
    nota.setUltimaalteracao(ultimaaAlteracao);
    nota.setTiponota(tipoNota);
    nota.setFezlista(fezLista);

    nota
      .create()
      .then((resultadosBanco) => {
        const disciplina = nota.getDisciplina();

        const aluno = nota.getAluno();

        const resposta = {
          status: true,
          msg: "Executado com sucesso",
          codigo: "004",
          dados: {
            idNota: resultadosBanco.insertId,
            Disciplina_idDisciplina: disciplina.iddisciplina,
            Aluno_matricula: aluno.matricula,
            bimestre: nota.getBimestre(),
            nota: nota.getNota(),
            ultimataAlteracao: nota.getUltimaalteracao(),
            tipoNota: nota.getTiponota(),
            fezLista: nota.getFezlista(),
          },
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        console.error("Error retrieving users:", erro);
      });
  });

  /**
   *
   * read
   *
   */
  app.get("/nota", function (request, response) {
    const nota = new Nota(banco);

    nota
      .read()
      .then((resultadosBanco) => {
        console.log("aqui foi");

        const resposta = {
          status: true,
          msg: "Executado com sucesso",
          dados: resultadosBanco,
        };

        response.status(200).send(resposta);
      })
      .catch((erro) => {
        const resposta = {
          status: false,
          msg: "erro ao executar",
          dados: erro,
        };
        response.status(200).send(resposta);
      });
  });

  app.get("/nota/:id/", (request, response) => {
    const idNota = request.params.id;

    const nota = new Nota(banco);

    nota.setIdnota(idNota);

    nota
      .read()
      .then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: "executado com sucesso",
          dados: resultadosBanco,
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        const resposta = {
          status: false,
          msg: "erro ao executar",
          codigo: "005",
          dados: erro,
        };
        response.status(200).send(resposta);
      });
  });

  app.get("/nota/disciplina/:id/", (request, response) => {
    const Disciplina_idDisciplina = request.params.id;

    const nota = new Nota(banco);

    const disciplina = new Disciplina(banco);
    disciplina.setIddisciplina(Disciplina_idDisciplina);

    nota.setDisciplina(disciplina);

    nota
      .read_disciplina_id()
      .then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: "executado com sucesso aqui estou novamente",
          dados: resultadosBanco,
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        const resposta = {
          status: false,
          msg: "erro ao executar",
          codigo: "005",
          dados: erro,
        };
        response.status(200).send(resposta);
      });
  });

  app.get("/nota/alunonota/:matricula/:bimestre/", (request, response) => {
    const Aluno_matricula = request.params.matricula;
    const bimestre = request.params.bimestre;

    const nota = new Nota(banco);

    const aluno = new Aluno(banco);
    aluno.setMatricula(Aluno_matricula);

    nota.setAluno(aluno);
    nota.setBimestre(bimestre);

    nota
      .read_detalhas_aluno_nota()
      .then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: "executado com sucesso aqui estou novamente",
          dados: resultadosBanco,
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        const resposta = {
          status: false,
          msg: "erro ao executar",
          codigo: "005",
          dados: erro,
        };
        response.status(200).send(resposta);
      });
  });

  /**
   * update
   */
  app.put("/nota/:id", (request, response) => {
    const idNota = request.params.id;
    const Disciplina_idDisciplina = request.body.disciplina;
    const Aluno_matricula = request.body.aluno;
    const bimestre = request.body.bimestre;
    const nota_json = request.body.nota;
    const ultimaaAlteracao = request.body.data;
    const tipoNota = request.body.tipoNota;
    const fezLista = request.body.fezLista;

    const nota = new Nota(banco);
    nota.setIdnota(idNota);

    console.log(idNota);

    const disciplina = new Disciplina(banco);
    disciplina.setIddisciplina(Disciplina_idDisciplina);

    nota.setDisciplina(disciplina);

    const aluno = new Aluno(banco);
    aluno.setMatricula(Aluno_matricula);

    nota.setAluno(aluno);

    nota.setBimestre(bimestre);
    nota.setNota(nota_json);
    nota.setUltimaalteracao(ultimaaAlteracao);
    nota.setTiponota(tipoNota);
    nota.setFezlista(fezLista);

    nota
      .update()
      .then((resultadosBanco) => {
        console.log("ESTOU NA PROMISE");
        const disciplina = nota.getDisciplina();

        const aluno = nota.getAluno();

        const resposta = {
          status: true,
          msg: "Executado com sucesso",
          codigo: "004",
          dados: {
            idNota: nota.getIdnota(),
            Disciplina_idDisciplina: disciplina.iddisciplina,
            Aluno_matricula: aluno.matricula,
            bimestre: nota.getBimestre(),
            nota: nota.getNota(),
            ultimataAlteracao: nota.getUltimaalteracao(),
            tipoNota: nota.getTiponota(),
            fezLista: nota.getFezlista(),
          },
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        console.error("Error retrieving users:", erro);
      });
  });

  /**
   * delete
   */
  app.delete("/nota/:id", (request, response) => {
    const idNota = request.params.id;

    const nota = new Nota(banco);

    nota.setIdnota(idNota);

    nota
      .delete()
      .then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: "Excluido com sucesso",
          codigo: "004",
          dados: {
            idDisciplina: nota.getIdnota(),
          },
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        console.error("Error retrieving users:", erro);
      });
  });
};
