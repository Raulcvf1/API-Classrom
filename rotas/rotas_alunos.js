//app e banco são recebidos quando fazemos a chamada

const Aluno = require("../modelo/Aluno");

// de rotas_funcionarios
module.exports = function (app, banco) {
  
  const JwtToken = require('../modelo/JwtToken');

  app.post('/aluno/login', (request, response) => {
    console.log("rota: POST: /aluno/login");

    const email = request.body.email;
    const senha = request.body.senha;

    const aluno = new Aluno(banco);
    aluno.setEmail(email);
    aluno.setSenha(senha);

    aluno.login().then((respostaLogin) => {
      if (respostaLogin.status == true) {
        let usuario = {
          email: respostaLogin.email,
          nome: respostaLogin.nome
        }
        const jwt = new JwtToken();
        const novoToken = jwt.gerarToken(usuario);

        const resposta = {
          status: true,
          msg: "Login efetuado com sucesso e agora parece q foi",
          token: novoToken,
          funcionario: usuario
        }

        response.status(201).send(resposta);
      } else {
        const resposta = {
          status: false,
          msg: "Usuário não logado",
          codigo: 401,
        }
        response.send(resposta, 404);
      }

    }).catch((erro) => {
      const resposta = {
        status: false,
        msg: 'erro ao executar',
        codigo: '005',
        dados: erro,
      }



      response.status(201).send(erro);
    });
    // return next(e);
    // response.status(201).send("erro");
  });

    /*************************************************************************************************************************** */
    //create
    app.post('/aluno', (request, response) => {

        const matricula = request.body.matricula;
        const nome = request.body.nome;
        const email = request.body.email;
        const wpp = request.body.wpp;
        const senha = request.body.senha;
    
        const aluno = new Aluno(banco);
        
        aluno.setMatricula(matricula)
        aluno.setNome(nome);
        aluno.setEmail(email);
        aluno.setWpp(wpp);
        aluno.setSenha(senha);

        aluno.create().then((resultadosBanco) => {
            const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '004',
            dados: {
                matricula: aluno.getMatricula(),
                nome: aluno.getNome(),
                email: aluno.getEmail(),
                wpp: aluno.getWpp()
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
    app.get('/aluno', function (request, response) {
  
        const aluno = new Aluno(banco);
  
        aluno.read().then((resultadosBanco) => {
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
  
  
    app.get('/aluno/:id/', (request, response) => {
  
        const matricula = request.params.id;

        const aluno = new Aluno(banco);

        aluno.setMatricula(matricula);

        aluno.read().then((resultadosBanco) => {
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
    app.put('/aluno/:id', (request, response) => {
  
        const matricula = request.params.id;
        const nome = request.body.nome;
        const email = request.body.email;
        const wpp = request.body.wpp;
        const senha = request.body.senha;
    
        const aluno = new Aluno(banco);
        
        aluno.setMatricula(matricula)
        aluno.setNome(nome);
        aluno.setEmail(email);
        aluno.setWpp(wpp);
        aluno.setSenha(senha);
  
        aluno.update().then((resultadosBanco) => {
            const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '004',
            dados: {
                matricula: aluno.getMatricula(),
                nome: aluno.getNome(),
                email: aluno.getEmail(),
                wpp: aluno.getWpp()
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
    app.delete('/aluno/:id', (request, response) => {
  
      const matricula = request.params.id;

      const aluno = new Aluno(banco);

      aluno.setMatricula(matricula);
  
      aluno.delete().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '004',
          dados: {
            matricula: aluno.getMatricula(),
          }
        }
        response.status(200).send(resposta);
      }).catch((erro) => {
        console.error('Error retrieving users:', erro);
      });;
  
    });
  };