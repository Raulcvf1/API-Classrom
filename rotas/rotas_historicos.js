
//app e banco são recebidos quando fazemos a chamada

const Historico = require("../modelo/Historico");

// de rotas_funcionarios
module.exports = function (app, banco) {

    const Nota = require("../modelo/Nota");
  
    /*************************************************************************************************************************** */
    //create
    app.post('/historico', (request, response) => {
      
        const Nota_idNota = request.body.Nota_idNota;
        const nota_json = request.body.nota;
        const ultimaAlteracao = request.body.ultimaAlteracao;

        const historico = new Historico(banco);

        const nota = new Nota(banco);
        nota.setIdnota(Nota_idNota);

        historico.setNota_id(nota);

        historico.setNota(nota_json);
        historico.setUltimaalteracao(ultimaAlteracao);

        historico.create().then((resultadosBanco) => {

            const nota_p = historico.getNota_id();
            
            const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '004',
            dados: {
                Nota_idNota: nota_p.idnota,
                nota: historico.getNota(),
                ultimaAlteracao: historico.getUltimaalteracao()
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
    app.get('/historico', function (request, response) {


        const historico = new Historico(banco);

        historico.read().then((resultadosBanco) => {
          console.log("aqui foi");

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
  
  
    app.get('/historico/:id/', (request, response) => {

        const Nota_idNota = request.params.id;

        const historico = new Historico(banco);
        
        const nota = new Nota(banco)
        nota.setIdnota(Nota_idNota);

        historico.setNota_id(nota);

        historico.read().then((resultadosBanco) => {
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
    app.put('/historico/:id', (request, response) => {

        const Nota_idNota = request.body.Nota_idNota;
        const nota_json = request.body.nota;
        const ultimaAlteracao = request.body.ultimaAlteracao;

        const historico = new Historico(banco);

        const nota = new Nota(banco);
        nota.setIdnota(Nota_idNota);

        historico.setNota_id(nota);

        historico.setNota(nota_json);
        historico.setUltimaalteracao(ultimaAlteracao);
  
        historico.update().then((resultadosBanco) => {

        console.log("ESTOU NA PROMISE")
        const nota_p = historico.getNota_id();

        const resposta = {
          status: true,
          msg: 'Executado com sucesso',
          codigo: '004',
          dados: {
            Nota_idNota: nota_p.idnota,
            nota: historico.getNota(),
            ultimaAlteracao: historico.getUltimaalteracao()
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
    app.delete('/historico/:id', (request, response) => {
  
      const Nota_idNota = request.params.id;

      const historico = new Historico(banco);

      const nota = new Nota(banco);
      nota.setIdnota(Nota_idNota);

      historico.setNota_id(nota);
  
      historico.delete().then((resultadosBanco) => {

        const nota_p = historico.getNota_id();

        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '004',
          dados: {
            Nota_idNota: nota_p.idnota,
          }
        }
        response.status(200).send(resposta);
      }).catch((erro) => {
        console.error('Error retrieving users:', erro);
      });;
  
    });
  };