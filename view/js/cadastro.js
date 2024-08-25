//recupera o token que foi gravado no local Storage no momento do login.
const TOKEN = localStorage.getItem("token");

// Extrair valores dos campos
var registroValue = document.getElementById("txtRegistro");
var nomeValue = document.getElementById("txtNome");
var emailValue = document.getElementById("txtEmail");
var senhaValue = document.getElementById("txtSenha");
var tipoValue = document.getElementById("tipo");

const btnRegister = document.getElementById("btnRegister");
const btnLogin = document.getElementById("btnLogin");

//vincula a função  onclick_btnLogin() ao click do botao de login
btnRegister.onclick = onclick_btnRegister;
btnLogin.onclick = onclick_btnLogin;
function onclick_btnLogin() {
  window.location = "Login.html";
}

//função que trata o evento de click do botão
function onclick_btnRegister() {
  //recupera os valores digitados no formulario
  const v_registro = registroValue.value;
  const v_nome = nomeValue.value;
  const v_email = emailValue.value;
  const v_senha = senhaValue.value;
  const v_tipo = tipoValue.value;

  //constroi um objeto json que será enviado na requisição
  const objJson = {
    registro: v_registro,
    nome: v_nome,
    email: v_email,
    senha: v_senha,
    tipo: v_tipo,
  };

  console.log(objJson);
  //chama a função que enviara os dados para a api que
  fetch_post_cadastrarProfessor(objJson);
}

//função assincrona para validar login
function fetch_post_cadastrarProfessor(objJson) {
  //converte o objeto recebido em um texto json
  const stringJson = JSON.stringify(objJson);

  //determina a uri do serviço na api
  const uri = "/professor";

  //fetch faz uma requisição assincrona
  //a requisição é do tipo POST
  // é enviado no corpo(body) da requisição o texto json com email e senha
  //define os cabeçalhos(headers) da requisição
  //envia o token de autorização no cabeçalho  da requisição
  const requisicao_assincrona = fetch(uri, {
    method: "post",
    body: stringJson,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <" + TOKEN + ">",
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
        window.location = "Login.html";
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
