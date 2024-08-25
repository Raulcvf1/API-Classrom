//cria um objeto para cada elemento html que é utilizado no script
const btnDisciplina = document.getElementById("btnDisciplina");
const txtNome_D = document.getElementById("txtNome_D");

// Recupera os dados do localStorage
var dadosTurmaString = localStorage.getItem("dadosTurma");
const objetoProfessor = JSON.parse(localStorage.getItem("jsonProfessor"));

// Verifica se há dados no localStorage
if (dadosTurmaString != "" && objetoProfessor.registro != "") {
  // Converte a string JSON de volta para um objeto JavaScript
  var dadosTurma = JSON.parse(dadosTurmaString);

  // Recupera o nome da turma
  var idTurma = dadosTurma.turma.idTurma;
  var registroProf = objetoProfessor.registro;
}

const txtIdProf = idTurma;
const txtIdTurma = registroProf;

//vincula a função  onclick_btnLogin() ao click do botao de login
btnDisciplina.onclick = onclick_btnDisciplina;

//função que trata o evento de click do botão
function onclick_btnDisciplina() {
  //recupera os valores digitados no formulario
  const v_nome = txtNome_D.value;
  const v_idprof = txtIdProf;
  const v_idturma = txtIdTurma;
  if (v_nome != "" && v_idprof != "" && v_idturma != "") {
    //constroi um objeto json que será enviado na requisição
    const objJson = {
      nome: v_nome,
      Professor_registro: v_idprof,
      Turma_idTurma: v_idturma,
    };
    //chama a função que enviara os dados para a api que
    //verificará o login
    console.log(objJson);
    ajax_disciplina_create(objJson);
  }
}

//recupera o token que foi gravado no local Storage no momento do login.
//const TOKEN = localStorage.getItem("token");

function ajax_disciplina_create(objJsonCargo) {
  //tranforma o objeto json recebido em texto.
  const stringJson = JSON.stringify(objJsonCargo);
  //determina a URI do serviço
  const URI = "/disciplina";
  //fetch faz uma requisição
  //envia o token de autorização no cabeçalho  da requisição
  //envia o json do novo cargo no corpo da requisição.
  fetch(URI, {
    method: "POST",
    body: stringJson,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.text();
    })
    .then((jsonResposta) => {
      //é execudado quando a api "php" responde.
      console.log("RECEBIDO:", jsonResposta);

      //converte a resposta da api para um objeto json.
      const objetoJson = JSON.parse(jsonResposta);
      if (objetoJson.status == true) {
        if (objetoJson.status == true) {
          console.log("AQUI FOI CADASTRADO DO SUCESSO");
          // Recarrega a página após o sucesso da requisição.
          window.location.reload();
        } else {
          console.log("AQUI NAO FOI NAUM");
        }
      } else {
        let codigo = objetoJson.codigo;
        if (codigo == 401) {
          console.log("USUARIO NAO LOGADO");
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
