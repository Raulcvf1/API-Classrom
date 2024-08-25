//recupera o token que foi gravado no local Storage no momento do login.
const TOKEN_disciplina_nota = localStorage.getItem("token");

//cria um objeto para cada elemento html que é utilizado no script
const btnGetAlunoNota = document.getElementById("btnGetAlunoNota");

const txtMatricula = document.getElementById("txtMatricula");
const txtBimestre = document.getElementById("txtBimestre");
const txtNota = document.getElementById("txtNota");
const txtUltima = document.getElementById("txtUltima");
const txtTipoNota = document.getElementById("txtTipoNota");
const txtLista = document.getElementById("txtLista");

//vincula a função  onclick_btnLogin() ao click do botao de login
btnGetAlunoNota.onclick = onclick_btnGetAlunoNota;

//função que trata o evento de click do botão
function onclick_btnGetAlunoNota() {
    ajax_disciplina_nota_get();
}

function ajax_disciplina_nota_get() {
    const txtAlunoMatricula_Detalhes = document.getElementById("txtAlunoMatricula_Detalhes");
    const txtBimestre_Detalhes = document.getElementById("txtBimestre_Detalhes");
  
    const URI = "/nota/alunonota/" + txtAlunoMatricula_Detalhes.value + "/" + txtBimestre_Detalhes.value;
  
    fetch(URI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN_disciplina_nota,
      },
    })
      .then((response) => response.json()) // Use response.json() para converter automaticamente a resposta para JSON
      .then((objetoJson) => {
        console.log("RECEBIDO:", objetoJson);
  
        if (objetoJson.status == true) {
          console.log("AQUI FOI CADASTRADO DO SUCESSO");
  
          // Limpar o corpo da tabela
          const tableBody = document.getElementById("tableBody_Detalhes_Aluno");
          tableBody.innerHTML = "";
  
          // Iterar sobre os dados e adicionar linhas à tabela
          objetoJson.dados.forEach((dados) => {
            const newRow = tableBody.insertRow();
  
            // Adicionar células à nova linha
            const matriculaCell = newRow.insertCell(0);
            const bimestreCell = newRow.insertCell(1);
            const notaCell = newRow.insertCell(2);
            const listaCell = newRow.insertCell(3);
  
            // Preencher células com os dados
            matriculaCell.innerHTML = dados.Aluno_matricula;
            bimestreCell.innerHTML = dados.bimestre;
            notaCell.innerHTML = dados.nota;
            listaCell.innerHTML = dados.fezLista;
          });
        } else {
          console.log("AQUI NAO FOI NAUM");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  
