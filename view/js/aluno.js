//recupera o token que foi gravado no local Storage no momento do login.
const TOKEN_aluno = localStorage.getItem("token");

//cria um objeto para cada elemento html que é utilizado no script
const btnCreateAluno = document.getElementById("btnCreateAluno");
const btnUpdateAluno = document.getElementById("btnUpdateAluno");
const btnDeleteAluno = document.getElementById("btnDeleteAluno");

const txtMatricula_aluno = document.getElementById("txtMatricula_aluno");
const txtNome = document.getElementById("txtNome");
const txtEmail = document.getElementById("txtEmail");
const txtWpp = document.getElementById("txtWpp");
const txtSenha = document.getElementById("txtSenha");

//vincula a função  onclick_btnLogin() ao click do botao de login
btnCreateAluno.onclick = onclick_btnCreateAluno;
btnUpdateAluno.onclick = onclick_btnUpdateAluno;
btnDeleteAluno.onclick = onclick_btnDeleteAluno;

//função que trata o evento de click do botão
function onclick_btnCreateAluno() {
  const v_matricula = txtMatricula_aluno.value;
  const v_nome = txtNome.value;
  const v_email = txtEmail.value;
  const v_wpp = txtWpp.value;
  const v_senha = txtSenha.value;

  //constroi um objeto json que será enviado na requisição
  const objJson = {
    matricula: v_matricula,
    nome: v_nome,
    email: v_email,
    wpp: v_wpp,
    senha: v_senha,
  };
  //chama a função que enviara os dados para a api que
  //verificará o login
  console.log(objJson);
  ajax_aluno_create(objJson);
}

function ajax_aluno_create(objJsonCargo) {
  //tranforma o objeto json recebido em texto.
  const stringJson = JSON.stringify(objJsonCargo);
  //determina a URI do serviço
  const URI = "/aluno";
  //fetch faz uma requisição
  //envia o token de autorização no cabeçalho  da requisição
  //envia o json do novo cargo no corpo da requisição.
  fetch(URI, {
    method: "post",
    body: stringJson,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <" + TOKEN_aluno + ">",
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

function onclick_btnUpdateAluno() {
  const txtNome = document.getElementById("txtNome_aluno_atualizar");
  const txtEmail = document.getElementById("txtEmail_aluno_atualizar");
  const txtWpp = document.getElementById("txtSenha_aluno_atualizar");
  const txtSenha = document.getElementById("txtWpp_aluno_atualizar");

  const v_nome = txtNome.value;
  const v_email = txtEmail.value;
  const v_wpp = txtWpp.value;
  const v_senha = txtSenha.value;

  //constroi um objeto json que será enviado na requisição
  const objJson = {
    nome: v_nome,
    email: v_email,
    wpp: v_wpp,
    senha: v_senha,
  };
  //chama a função que enviara os dados para a api que
  //verificará o login
  console.log(objJson);
  ajax_aluno_update(objJson);
}

function ajax_aluno_update(objJsonCargo) {
  const txtMatricula_aluno = document.getElementById(
    "txtMatricula_aluno_atualizar"
  );

  //tranforma o objeto json recebido em texto.
  const stringJson = JSON.stringify(objJsonCargo);
  console.log(stringJson);
  console.log(txtMatricula_aluno.value);
  //determina a URI do serviço
  const URI = "/aluno/" + txtMatricula_aluno.value;
  //fetch faz uma requisição
  //envia o token de autorização no cabeçalho  da requisição
  //envia o json do novo cargo no corpo da requisição.
  fetch(URI, {
    method: "put",
    body: stringJson,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <" + TOKEN_aluno + ">",
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

function onclick_btnDeleteAluno() {
  ajax_aluno_delete();
}

function ajax_aluno_delete() {
  const txtMatricula_aluno_atualizar = document.getElementById(
    "txtMatricula_aluno_atualizar"
  );

  console.log(txtMatricula_aluno.value);
  //determina a URI do serviço
  const URI = "/aluno/" + txtMatricula_aluno_atualizar.value;
  //fetch faz uma requisição
  //envia o token de autorização no cabeçalho  da requisição
  //envia o json do novo cargo no corpo da requisição.
  fetch(URI, {
    method: "delete",
    body: "",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <" + TOKEN_aluno + ">",
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
