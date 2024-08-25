const btnDeleteDisciplina = document.getElementById("btnDeleteDisciplina");
const btnUpdateTurma = document.getElementById("btnUpdateTurma");

btnDeleteDisciplina.onclick = onclick_btnDeleteDisciplina;
btnUpdateTurma.onclick = onclick_btnUpdateTurma;

function onclick_btnUpdateTurma() {
    const txtNomeTurma_atualizar = document.getElementById("txtNomeTurma_atualizar");
    const txtAbreviacaoTurma_atualizar = document.getElementById("txtAbreviacaoTurma_atualizar");
    const txtAnoTurma_atualizar = document.getElementById("txtAnoTurma_atualizar");

    const v_nome = txtNomeTurma_atualizar.value;
    const v_abreviacao = txtAbreviacaoTurma_atualizar.value;
    const v_ano = txtAnoTurma_atualizar.value;

    let idTurma;

    // Recuperar o valor do localStorage
    var dadosTurmaJSON = localStorage.getItem("dadosTurma");

    if (dadosTurmaJSON !== null) {
        var dadosTurmaObjeto = JSON.parse(dadosTurmaJSON);
        var turma = dadosTurmaObjeto.turma;
        idTurma = turma.idTurma;
    } else {
        console.log("O item 'dadosTurma' não foi encontrado no localStorage.");
        return;
    }

    if (v_nome != "" && v_abreviacao != "" && v_ano != "") {
        const objJson = {
            nome: v_nome,
            abreviacao: v_abreviacao,
            ano: v_ano
        };

        fetch_update_turma(objJson, idTurma);
    }
}

function fetch_update_turma(objJson, idTurma) {
    const stringJson = JSON.stringify(objJson);

    const uri_update = "/turma/" + idTurma;

    const requisicao_assincrona = fetch(uri_update, {
        method: "PUT",
        body: stringJson,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: ""
        }
    });

    requisicao_assincrona
        .then((response) => {
            return response.text();
        })
        .then((jsonResposta) => {
            console.log("RECEBIDO:", jsonResposta);
            const objetoJson = JSON.parse(jsonResposta);

            if (objetoJson.status == true) {
                window.location = "PainelTurma.html";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function onclick_btnDeleteDisciplina() {
    fetch_delete_disciplina();
}

function fetch_delete_disciplina() {
    let idTurma;

    var dadosTurmaJSON = localStorage.getItem("dadosTurma");

    if (dadosTurmaJSON !== null) {
        var dadosTurmaObjeto = JSON.parse(dadosTurmaJSON);
        var turma = dadosTurmaObjeto.turma;
        idTurma = turma.idTurma;
    } else {
        console.log("O item 'dadosTurma' não foi encontrado no localStorage.");
        return;
    }

    const uri = "/turma/" + idTurma;

    const requisicao_assincrona = fetch(uri, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: ""
        }
    });

    requisicao_assincrona
        .then((response) => {
            return response.text();
        })
        .then((jsonResposta) => {
            console.log("RECEBIDO:", jsonResposta);
            const objetoJson = JSON.parse(jsonResposta);

            if (objetoJson.status == true) {
                window.location = "PainelTurma.html";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
