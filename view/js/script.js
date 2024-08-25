//função assincrona para validar login
function fetch_get_nometurma() {
    //determina a uri do serviço na api
    const uri = "/turma";

    //fetch faz uma requisição assincrona
    //a requisição é do tipo POST
    // é enviado no corpo(body) da requisição o texto json com email e senha
    //define os cabeçalhos(headers) da requisição
    //envia o token de autorização no cabeçalho  da requisição
    const requisicao_assincrona = fetch(uri, {
        method: "get",
        body: stringJson,
        headers: {
            'Accept': 'application/json',               //Aceita json como resposta da api
            'Content-Type': 'application/json',         //Informa que irá enviar para api conteúdo em json
            'Authorization': ""                         //não envia token pq ainda não está logado
        }
    });
    
    //caso seja retornada uma resposta da api, ela será processada abaixo
    requisicao_assincrona.then((response) => { return response.text(); }).then((jsonResposta) => {
               //é execudado quando a api "js" responde.

               //mostra o contúdo recebido da api no console do navegador.
        console.log("RECEBIDO:", jsonResposta);
        
        //converte a resposta da api para um objeto json.
        const objetoJson = JSON.parse(jsonResposta);
    
        //caso o status da resposta seja true entra no if
        if (objetoJson.status == true) {
            let stringJsonDados = JSON.stringify(objetoJson.dados);
            console.log(stringJsonDados)
        } else {
            //caso o status da resposta não sseja true
            //escreve a mensagem que veio da api
            console.log("deu ruim");
        }

    });

    //caso aconteça algum erro o catch é chamado e o erro é apresentado no console do navegador
    requisicao_assincrona.catch((error) => {
        console.error("Error:", error);
    });
}