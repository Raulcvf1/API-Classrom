//recupera o token que foi gravado no local Storage no momento do login.
const TOKEN = localStorage.getItem("token");

//quando os funcionarios forem carregados, serão armazenados nessa variável
let FUNCIONARIOS_JSON = {};

//quando os cargos forem carregados, serão armazenados nessa variável
let CARGOS_JSON = {};

const tblFuncionarios = document.getElementById("tblFuncionarios");
const divFormulario = document.getElementById("divFormulario");
const divResposta = document.getElementById("divResposta");
const lblResposta = document.createTextNode("");
divResposta.append(lblResposta);

const txtId = document.getElementById("txtId");
const txtNome = document.getElementById("txtNome");
const txtEmail = document.getElementById("txtEmail");
const txtSenha = document.getElementById("txtSenha");
const txtFiltro = document.getElementById("txtFiltro");

const chkVT = document.getElementById("chkValeTransporte");
const cboCargos = document.getElementById("cboCargos");

const btnNovo = document.getElementById("btnNew");
const btnCadastrar = document.getElementById("btnCreate");
const btnUpdate = document.getElementById("btnUpdate");
const btnCancelar = document.getElementById("btnCancelar");

window.onload = function () {
    divFormulario.hidden = true;
    btnCadastrar.hidden = true;
    btnUpdate.hidden = true;
    btnCancelar.hidden = true;
    fetch_cargos_get();
    fetch_funcionarios_get();
}

btnCadastrar.onclick = btnCreate_onclick;
btnNovo.onclick = btnNovo_onclick;
btnCancelar.onclick = btnCancelar_onclick;
btnUpdate.onclick = btnUpdate_onclick;
txtFiltro.onkeyup = txtFiltro_onkeyup;

function btnUpdate_onclick() {
    fetch_funcionarios_put(txtId.value)
}

function btnNovo_onclick() {
    limparFormulario();
}

function btnCancelar_onclick() {
    esconderFormulario();
}
function esconderFormulario(){
    lblResposta.nodeValue = "";
    btnNovo.hidden = false;
    btnUpdate.hidden = true;
    divFormulario.hidden = true;
    btnCancelar.hidden = true;
    btnCadastrar.hidden = true;
}
function btnCreate_onclick() {
    if (validarFormulario_post() == true) {
        fetch_funcionarios_post();
    }
}

function txtFiltro_onkeyup() {
    let filtro = txtFiltro.value;
    construirTabela(filtro);
}


function limparFormulario() {
    btnNovo.hidden = true;
    divFormulario.hidden = false;
    btnCadastrar.hidden = false;
    btnCancelar.hidden = false;
    txtId.value = "";
    txtNome.value = "";
    txtEmail.value = "";
    txtSenha.value="";
    chkValeTransporte.checked = false;
    cboCargos.value = "";
}

function limparTabela() {
    var qtdLinhas = 1;
    var totalLinhas = tblFuncionarios.rows.length;
    for (var i = qtdLinhas; i < totalLinhas; i++) {
        tblFuncionarios.deleteRow(qtdLinhas);
    }
}

function construirTabela(filtro) {
    limparTabela();
    const funcionarios = FUNCIONARIOS_JSON;

    for (let funcionario of funcionarios) {
        if (filtro != null) {
            let nomeFuncionario = funcionario.nome
            nomeFuncionario = nomeFuncionario.toLowerCase();
            filtro = filtro.toLowerCase();
            let result = nomeFuncionario.includes(filtro);
            if (result == false) {
                continue;
            }
        }
        let idCargo = funcionario.idCargo

        const linha = document.createElement("tr");
        const colunaIdFuncionario = document.createElement("td");
        const colunaNome = document.createElement("td");
        const colunaEmail = document.createElement("td");
        const colunaVT = document.createElement("td");
        const colunaCargo = document.createElement("td");
        const colunaSelecionar = document.createElement("td");
        const colunaExcluir = document.createElement("td");
        
        var recebeValeTransporte = "não";
        if (funcionario.recebeValeTransporte == 1) {
            recebeValeTransporte = "sim";
        }

        const btnSelecionar = document.createElement("button");
        btnSelecionar.appendChild(document.createTextNode("Selecionar"));
        btnSelecionar.onclick = function () {
            limparFormulario();
            divFormulario.hidden = false;
            btnCancelar.hidden = false;
            btnNovo.hidden = true;
            btnCadastrar.hidden = true;
            btnUpdate.hidden = false;
            txtId.value = funcionario.idFuncionario;
            txtNome.value = funcionario.nome;
            txtEmail.value = funcionario.email;
            if (funcionario.recebeValeTransporte == 1) {
                chkVT.checked = true;
            } else {
                chkVT.checked = false;
            }
            cboCargos.value = funcionario.idCargo;
        }



        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "excluir";
        btnExcluir.onclick = function () {
            const msg = "Deseja excluir: [ " + funcionario.nome + " ] ?";
            const resposta = confirm(msg);
            if (resposta) {
                fetch_funcionarios_delete(funcionario.idFuncionario);
            }
        }

        colunaIdFuncionario.appendChild(document.createTextNode(funcionario.idFuncionario));
        colunaNome.append(document.createTextNode(funcionario.nome));
        colunaEmail.append(document.createTextNode(funcionario.email));
        colunaVT.append(document.createTextNode(recebeValeTransporte));
        colunaCargo.append(document.createTextNode(funcionario.nomeCargo));
        
        colunaSelecionar.append(btnSelecionar);
        colunaExcluir.append(btnExcluir);

        linha.appendChild(colunaIdFuncionario);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaEmail);
        linha.appendChild(colunaVT);
        linha.appendChild(colunaCargo);
        linha.appendChild(colunaSelecionar);
        linha.appendChild(colunaExcluir);

        tblFuncionarios.appendChild(linha);

    }
}


function fetch_funcionarios_post() {
    const jsonEnvio = {
        nome: txtNome.value,
        email: txtEmail.value,
        senha: txtSenha.value,
        vt: chkVT.checked,
        idCargo: cboCargos.value
    }
    const string_jsonEnvio = JSON.stringify(jsonEnvio);
    let uri = "/funcionarios";
    fetch(uri, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
        body: string_jsonEnvio
    }).then((response) => {
        return response.text();
    }).then((jsonResposta) => {
        console.log("RECEBIDO:", jsonResposta)
        let objetoJson = JSON.parse(jsonResposta);
        if (objetoJson.status == true) {
            fetch_funcionarios_get();
            limparFormulario();
            esconderFormulario();
        } else {
            let codigo = objetoJson.codigo;
            if (codigo == 401) {
                divResposta.append(document.createTextNode("usuário não logado"));
            }
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
}


function fetch_funcionarios_get() {
    let uri = "/funcionarios";
    fetch(uri, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        },
    }).then((response) => {
        return response.text();
    }).then((funcionariosJson) => {
        console.log("RECEBIDO:", funcionariosJson);
        const objetoJson = JSON.parse(funcionariosJson);
        if (objetoJson.status == true) {
            FUNCIONARIOS_JSON = objetoJson.dados;
            construirTabela();
        } else {
            let codigo = objetoJson.codigo;
            if (codigo == 401) {
                divResposta.append(document.createTextNode("usuário não logado"));
            }
        }


    }).catch((error) => {
        console.error("Error:", error);
    });
}


function fetch_funcionarios_put(idFuncionario) {
    if (txtNome.value == "") {
        lblResposta.nodeValue = "nome não pode ser vazio";
    } else if (txtSenha.value == "") {
        lblResposta.nodeValue = "senha não pode ser vazia";
    } else {
        const jsonEnvio = {
            nome: txtNome.value,
            email: txtEmail.value,
            senha: txtSenha.value,
            vt: chkVT.checked,
            idCargo: cboCargos.value
        }
        const string_jsonEnvio = JSON.stringify(jsonEnvio);
        let uri = "/funcionarios/" + idFuncionario;
        fetch(uri, {
            method: "PUT",
            body: string_jsonEnvio,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer <' + TOKEN + '>',
            }
        }).then((response) => {
            return response.text();
        }).then((funcionariosJson) => {
            console.log("RECEBIDO:", funcionariosJson);
            const objetoJson = JSON.parse(funcionariosJson);
            if (objetoJson.status == true) {
                fetch_funcionarios_get();
                lblResposta.nodeValue = "Atualizado com sucesso";
                limparFormulario();
                esconderFormulario();
            } else {
                let codigo = objetoJson.codigo;
                if (codigo == 401) {
                    divResposta.append(document.createTextNode("usuário não logado"));
                }
            }
        }).catch((error) => {
            console.error("Error:", error);
        });
    }
}

function validarFormulario_post() {
    if (txtNome.value == "") {
        lblResposta.nodeValue = "O nome não pode ser vazio";
        return false;
    }
    return true;
}

function fetch_funcionarios_delete(idFuncionario) {
    let uri = "/funcionarios/" + idFuncionario;
    fetch(uri, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        }
    }).then((response) => {
        return response.text();
    }).then((textoJsonCargos) => {
        console.log("RECEBIDO:", textoJsonCargos)
        let objetoJson = JSON.parse(textoJsonCargos);
        
        if (objetoJson.status == true) {
            fetch_funcionarios_get();
            limparFormulario();
            esconderFormulario();
        }else {
            let codigo = objetoJson.codigo;
            if (codigo == 401) {
                divResposta.append(document.createTextNode("usuário não logado"));
            }
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
}

function fetch_cargos_get() {
    const combo = document.getElementById("cboCargos");
    let uri = "/cargos";
    fetch(uri, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        }
    }).then((response) => {
        return response.text();
    }).then((textoJsonCargos) => {
        console.log("RECEBIDO:", textoJsonCargos)
        let objetoJson = JSON.parse(textoJsonCargos);
        if (objetoJson.status == true) {
            CARGOS_JSON  = objetoJson.dados;
            preencherCaixaCombo();
        }else {
            let codigo = objetoJson.codigo;
            if (codigo == 401) {
                divResposta.append(document.createTextNode("usuário não logado"));
            }
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
    function preencherCaixaCombo(){
        for (let cargo of CARGOS_JSON) {
            let idCargo = cargo.idCargo
            let nomeCargo = cargo.nomeCargo
            var option = document.createElement("option");
            option.text = nomeCargo;
            option.value = idCargo;
            combo.add(option);
        }
    }
}


