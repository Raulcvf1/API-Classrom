//app e banco são recebidos quando fazemos a chamada

const Professor = require("../modelo/Professor");

// de rotas_funcionarios
module.exports = function (app, banco) {
  const JwtToken = require("../modelo/JwtToken");

  app.post("/professor/login", (request, response) => {
    console.log("rota: POST: /professor/login");

    const email = request.body.email;
    const senha = request.body.senha;

    const professor = new Professor(banco);
    professor.setEmail(email);
    professor.setSenha(senha);

    professor
      .login()
      .then((respostaLogin) => {
        if (respostaLogin.status == true) {
          let usuario = {
            registro: respostaLogin.registro,
            nome: respostaLogin.nome,
            email: respostaLogin.email,
          };
          const jwt = new JwtToken();
          const novoToken = jwt.gerarToken(usuario);

          const resposta = {
            status: true,
            msg: "Login efetuado com sucesso e agora parece q foi",
            token: novoToken,
            professor: usuario,
          };

          response.status(201).send(resposta);
        } else {
          const resposta = {
            status: false,
            msg: "Usuário não logado",
            codigo: 401,
          };
          response.send(resposta, 404);
        }
      })
      .catch((erro) => {
        const resposta = {
          status: false,
          msg: "erro ao executar",
          codigo: "005",
          dados: erro,
        };

        response.status(201).send(erro);
      });
    // return next(e);
    // response.status(201).send("erro");
  });

  //no bloco de codigo do professor/insert como posso testar o jwttoken do usuario vindo do bearer

  /*************************************************************************************************************************** */
  //create
  app.post("/professor", (request, response) => {
    const jwt = new JwtToken();

    const token = request.headers.authorization;

    const tokenValido = jwt.validarToken(token);

    //if (tokenValido.status == true) {
    const dadosUsuario = tokenValido.dados;
    console.log("Dados do usuário autenticado:", dadosUsuario);
    const registro = request.body.registro;
    const nome = request.body.nome;
    const email = request.body.email;
    const senha = request.body.senha;
    const tipo = request.body.tipo;

    const professor = new Professor(banco);
    professor.setRegistro(registro);
    professor.setNome(nome);
    professor.setEmail(email);
    professor.setSenha(senha);
    professor.setTipo(tipo);

    professor
      .create()
      .then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: "Executado com sucesso",
          codigo: "004",
          dados: {
            registro: professor.getRegistro(),
            nome: professor.getNome(),
            email: professor.getEmail(),
            tipo: professor.getTipo(),
          },
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        console.error("Error retrieving users:", erro);
      });
    //} else {
    //return response
    //.status(401)
    //.json({ message: "Token inválido ou não fornecido" });
    //}
  });

  /**
   *
   * read
   *
   */
  app.get("/professor", function (request, response) {
    const professor = new Professor(banco);

    professor
      .read()
      .then((resultadosBanco) => {
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

  app.get("/professor/:id/", (request, response) => {
    const professor = new Professor(banco);

    const registro = request.params.id;

    professor.setRegistro(registro);

    professor
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
  /**
   * update
   */
  app.put("/professor/:id", (request, response) => {
    const registro = request.params.id;
    const nome = request.body.nome;
    const email = request.body.email;
    const senha = request.body.senha;
    const tipo = request.body.tipo;

    const professor = new Professor(banco);

    professor.setRegistro(registro);
    professor.setNome(nome);
    professor.setEmail(email);
    professor.setSenha(senha);
    professor.setTipo(tipo);

    professor
      .update()
      .then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: "Executado com sucesso",
          codigo: "004",
          dados: {
            registro: professor.getRegistro(),
            nome: professor.getNome(),
            email: professor.getEmail(),
            tipo: professor.getTipo(),
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
  app.delete("/professor/:id", (request, response) => {
    const registro = request.params.id;

    const professor = new Professor(banco);

    professor.setRegistro(registro);

    professor
      .delete()
      .then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: "Excluido com sucesso",
          codigo: "004",
          dados: {
            registro: professor.getRegistro(),
          },
        };
        response.status(200).send(resposta);
      })
      .catch((erro) => {
        console.error("Error retrieving users:", erro);
      });
  });
};
