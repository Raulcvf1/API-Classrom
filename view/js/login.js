//cria um objeto para cada elemento html que é utilizado no script
const divResposta = document.getElementById("divResposta");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const txtEmail = document.getElementById("txtEmail");
const txtSenha = document.getElementById("txtSenha");

//vincula a função  onclick_btnLogin() ao click do botao de login
btnLogin.onclick = onclick_btnLogin;
btnRegister.onclick = onclick_btnRegister;

function onclick_btnRegister() {
  window.location = "Cadastro.html";
}

//função que trata o evento de click do botão
function onclick_btnLogin() {
  //recupera os valores digitados no formulario
  const v_email = txtEmail.value;
  const v_senha = txtSenha.value;

  //constroi um objeto json que será enviado na requisição
  const objJson = {
    email: v_email,
    senha: v_senha,
  };
  //chama a função que enviara os dados para a api que
  //verificará o login
  fetch_post_verificarLogin(objJson);
}

//função assincrona para validar login
function fetch_post_verificarLogin(objJson) {
  //converte o objeto recebido em um texto json
  const stringJson = JSON.stringify(objJson);

  //determina a uri do serviço na api
  const uri = "/professor/login";

  //fetch faz uma requisição assincrona
  //a requisição é do tipo POST
  // é enviado no corpo(body) da requisição o texto json com email e senha
  //define os cabeçalhos(headers) da requisição
  //envia o token de autorização no cabeçalho  da requisição
  const requisicao_assincrona = fetch(uri, {
    method: "post",
    body: stringJson,
    headers: {
      Accept: "application/json", //Aceita json como resposta da api
      "Content-Type": "application/json", //Informa que irá enviar para api conteúdo em json
      Authorization: "", //não envia token pq ainda não está logado
    },
  });

  //caso seja retornada uma resposta da api, ela será processada abaixo
  requisicao_assincrona
    .then((response) => {
      return response.text();
    })
    .then((jsonResposta) => {
      //é execudado quando a api "js" responde.

      //mostra o contúdo recebido da api no console do navegador.
      console.log("RECEBIDO:", jsonResposta);

      //converte a resposta da api para um objeto json.
      const objetoJson = JSON.parse(jsonResposta);

      //caso o status da resposta seja true entra no if
      if (objetoJson.status == true) {
        let stringJsonProfessor = JSON.stringify(objetoJson.professor);

        //recupera o novo token e armanzena no localStorage
        localStorage.setItem("token", objetoJson.token);

        //recupera o json no formato: {"email":"","nome":"","idFuncionario":"","idCargo":"","nomeCargo":""}
        //esses dados são armazenado no localStorage e potem ser utilizados
        //para verificações adicionais dentro do front-end
        localStorage.setItem("jsonProfessor", stringJsonProfessor);

        //redireciona para a pagina Painel.html
        window.location = "PainelTurma.html";
      } else {
        //caso o status da resposta não sseja true
        //escreve a mensagem que veio da api
        divResposta.appendChild(document.createTextNode(objetoJson.msg));
      }
    });

  //caso aconteça algum erro o catch é chamado e o erro é apresentado no console do navegador
  requisicao_assincrona.catch((error) => {
    console.error("Error:", error);
  });
}
