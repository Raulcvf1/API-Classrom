
//app e banco são recebidos quando fazemos a chamada

const Revisao = require("../modelo/Revisao");

// de rotas_funcionarios
module.exports = function (app, banco) {

    const Nota = require("../modelo/Nota");
  
    /*************************************************************************************************************************** */
    //create
    app.post('/revisao', (request, response) => {
      
        const Nota_idNota = request.body.Nota_idNota;
        const descricao = request.body.descricao;
        const status = request.body.status;

        const revisao = new Revisao(banco);

        const nota = new Nota(banco);
        nota.setIdnota(Nota_idNota);

        revisao.setNota(nota);

        revisao.setDescricao(descricao);
        revisao.setStatus(status);

        revisao.create().then((resultadosBanco) => {

            const nota = revisao.getNota();
            
            const resposta = {
            status: true,
            msg: 'Executado com sucesso',
            codigo: '004',
            dados: {
                idPedidoRevisao: resultadosBanco.insertId,
                Nota_idNota: nota.Nota_idNota,
                descricao: revisao.getDescricao(),
                status: revisao.getStatus()
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
    app.get('/revisao', function (request, response) {


        const revisao = new Revisao(banco);

        revisao.read().then((resultadosBanco) => {
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
  
  
    app.get('/revisao/:id/', (request, response) => {

        const idPedidoRevisao = request.params.id;

        const revisao = new Revisao(banco);
  
        revisao.setIdpedidorevisao(idPedidoRevisao);

        revisao.read().then((resultadosBanco) => {
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
    app.put('/revisao/:id', (request, response) => {

      const idPedidoRevisao = request.params.id;
      const Nota_idNota = request.body.Nota_idNota;
      const descricao = request.body.descricao;
      const status = request.body.status;

      const revisao = new Revisao(banco);

      const nota = new Nota(banco);
      nota.setIdnota(Nota_idNota);

      revisao.setNota(nota);

      revisao.setDescricao(descricao);
      revisao.setStatus(status);
      revisao.setIdpedidorevisao(idPedidoRevisao)
  
      revisao.update().then((resultadosBanco) => {

        console.log("ESTOU NA PROMISE")
        const nota_p = revisao.getNota();

        const resposta = {
          status: true,
          msg: 'Executado com sucesso',
          codigo: '004',
          dados: {
            idPedidoRevisao: revisao.getIdpedidorevisao(),
            Nota_idNota: nota_p.idnota,
            descricao: revisao.getDescricao(),
            status: revisao.getStatus()
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
    app.delete('/revisao/:id', (request, response) => {
  
      const idPedidoRevisao = request.params.id;

      const revisao = new Revisao(banco);

      revisao.setIdpedidorevisao(idPedidoRevisao);
  
      revisao.delete().then((resultadosBanco) => {
        const resposta = {
          status: true,
          msg: 'Excluido com sucesso',
          codigo: '004',
          dados: {
            idPedidoRevisao: revisao.getIdpedidorevisao(),
          }
        }
        response.status(200).send(resposta);
      }).catch((erro) => {
        console.error('Error retrieving users:', erro);
      });;
  
    });
  };