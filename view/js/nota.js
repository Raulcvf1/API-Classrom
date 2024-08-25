//recupera o token que foi gravado no local Storage no momento do login.
const TOKEN_nota = localStorage.getItem("token");

//cria um objeto para cada elemento html que é utilizado no script
const btnAtualizar = document.getElementById("btnAtualizar");
const btnCreateNota = document.getElementById("btnCreateNota");
const btnDeleteNota = document.getElementById("btnDeleteNota");

const txtMatricula = document.getElementById("txtMatricula");
const txtBimestre = document.getElementById("txtBimestre");
const txtNota = document.getElementById("txtNota");
const txtUltima = document.getElementById("txtUltima");
const txtTipoNota = document.getElementById("txtTipoNota");
const txtLista = document.getElementById("txtLista");

//vincula a função  onclick_btnLogin() ao click do botao de login
btnAtualizar.onclick = onclick_btnAtualizar;
btnCreateNota.onclick = onclick_btnCreateNota;
btnDeleteNota.onclick = onclick_btnDeleteNota;

//função que trata o evento de click do botão
function onclick_btnAtualizar() {
  //recupera os valores digitados no formulario

  // Recupera os dados do localStorage
  var dadosDisciplinaString = localStorage.getItem("dadosDisciplina");

  // Verifica se há dados no localStorage
  if (dadosDisciplinaString != "") {
    // Converte a string JSON de volta para um objeto JavaScript
    var dadosDisciplina = JSON.parse(dadosDisciplinaString);

    // Recupera o nome da turma
    var idDisciplina = dadosDisciplina.disciplina.idDisciplina;
  }

  const v_iddisc = idDisciplina;
  const v_matricula = txtMatricula.value;
  const v_bimestre = txtBimestre.value;
  const v_nota = txtNota.value;
  const v_ultima = txtUltima.value;
  const v_tipoNota = txtTipoNota.value;
  const v_lista = txtLista.value;
  //constroi um objeto json que será enviado na requisição
  const objJson = {
    disciplina: v_iddisc,
    aluno: v_matricula,
    bimestre: v_bimestre,
    nota: v_nota,
    data: v_ultima,
    tipoNota: v_tipoNota,
    fezLista: v_lista,
  };
  //chama a função que enviara os dados para a api que
  //verificará o login
  console.log(objJson);
  ajax_nota_update(objJson);
}

function onclick_btnCreateNota() {
  //recupera os valores digitados no formulario
  const txtMatriculaCreate_nota = document.getElementById("txtMatriculaCreate_nota");
  const txtBimestreCreate_nota = document.getElementById("txtBimestreCreate_nota");
  const txtNotaCreate_nota = document.getElementById("txtNotaCreate_nota");
  const txtUltimaCreate_Nota = document.getElementById("txtUltimaCreate_Nota");
  const txtTipoNotaCreate_nota = document.getElementById("txtTipoNotaCreate_nota");
  const txtListaCreate_nota = document.getElementById("txtListaCreate_nota");

  // Recupera os dados do localStorage
  var dadosDisciplinaString = localStorage.getItem("dadosDisciplina");

  // Verifica se há dados no localStorage
  if (dadosDisciplinaString != "") {
    // Converte a string JSON de volta para um objeto JavaScript
    var dadosDisciplina = JSON.parse(dadosDisciplinaString);

    // Recupera o nome da turma
    var idDisciplina = dadosDisciplina.disciplina.idDisciplina;
  }

  console.log("ID DA DISCPLINA: " + idDisciplina);

  const v_matricula = txtMatriculaCreate_nota.value;
  const v_bimestre = txtBimestreCreate_nota.value;
  const v_nota = txtNotaCreate_nota.value;
  const v_ultima = txtUltimaCreate_Nota.value;
  const v_tipoNota = txtTipoNotaCreate_nota.value;
  const v_lista = txtListaCreate_nota.value;
  
  //constroi um objeto json que será enviado na requisição
  const objJson = {
    disciplina: idDisciplina,
    aluno: v_matricula,
    bimestre: v_bimestre,
    nota: v_nota,
    data: v_ultima,
    tipoNota: v_tipoNota,
    fezLista: v_lista,
  };
  //chama a função que enviara os dados para a api que
  //verificará o login
  console.log(objJson);

  ajax_nota_create(objJson);
}

function ajax_nota_create(objJsonCargo) {
  //tranforma o objeto json recebido em texto.
  const stringJson = JSON.stringify(objJsonCargo);
  console.log(stringJson);
  //determina a URI do serviço
  const URI = "/nota";
  //fetch faz uma requisição
  //envia o token de autorização no cabeçalho  da requisição
  //envia o json do novo cargo no corpo da requisição.
  fetch(URI, {
    method: "post",
    body: stringJson,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <" + TOKEN_nota + ">",
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
          // Recarrega a página após o sucesso
          location.reload();
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

function ajax_nota_update(objJsonCargo) {
  const txtIdNota = document.getElementById("txtIdNota");

  //tranforma o objeto json recebido em texto.
  const stringJson = JSON.stringify(objJsonCargo);
  //determina a URI do serviço
  const URI = "/nota/" + txtIdNota.value;
  //fetch faz uma requisição
  //envia o token de autorização no cabeçalho  da requisição
  //envia o json do novo cargo no corpo da requisição.
  fetch(URI, {
    method: "put",
    body: stringJson,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <" + TOKEN_nota + ">",
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
          // Recarrega a página após o sucesso
          location.reload();
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

function onclick_btnDeleteNota() {
  ajax_nota_delete();
}

function ajax_nota_delete() {
  const txtIdNota = document.getElementById("txtIdNota");
  //determina a URI do serviço
  const URI = "/nota/" + txtIdNota.value;
  //fetch faz uma requisição
  //envia o token de autorização no cabeçalho  da requisição
  //envia o json do novo cargo no corpo da requisição.
  fetch(URI, {
    method: "delete",
    body: "",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <" + TOKEN_nota + ">",
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
          // Recarrega a página após o sucesso
          location.reload();
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
