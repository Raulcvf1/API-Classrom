//recupera o token que foi gravado no local Storage no momento do login.
const TOKEN = localStorage.getItem("token");

//quando os cargos forem carregados, serão armazenados nessa variável
let CARGOS_JSON = {};

//recupera uma instância de cada elemento visual

const txtCargo = document.getElementById("txtCargo");
const txtIdCargo = document.getElementById("txtIdCargo");
const txtFiltro = document.getElementById("txtFiltro");
const tblCargos = document.getElementById("tblCargos");

const divResposta = document.getElementById("divResposta");

const btnCadastrar = document.getElementById("btnCadastrar");
const btnAtualizar = document.getElementById("btnAtualizar");
const btnExcluir = document.getElementById("btnExcluir");
const btnCancelar = document.getElementById("btnCancelar");

//vincula o evento aos componentes;
btnCadastrar.onclick    = btnCadastrar_onclick;
btnAtualizar.onclick    = btnAtualizar_onclick;
btnExcluir.onclick      = btnExcluir_onclick;
btnCancelar.onclick     = btnCancelar_onclick;


//vincula o evento de "levantar tecla" na caixa de texto de filtro
txtFiltro.onkeyup = txtFiltro_onkeyup;

//executa a função ajax_cargo_read()
window.onload = function () {
    fetch_cargos_get();
}


//função executada quando o botao de cadastrar é utilizado.
function btnCadastrar_onclick() {
    const v_cargo = txtCargo.value;
    if (v_cargo == "") {
        divResposta.append(document.createTextNode("Cargo não pode ser vazio"));

    } else {
        const objJsonCargo = {
            nomeCargo: v_cargo
        }
        //chama a função que fará um post
        ajax_cargo_create(objJsonCargo);
    }
}
function btnAtualizar_onclick() {
    const id = txtIdCargo.value
    const cargo = txtCargo.value;
    if (id == "") {
        limparDiv(divResposta);
        divResposta.append(document.createTextNode("Selecione um cargo"));
    } else {
        const objJson = {
            nomeCargo: cargo
        };

        fetch_cargos_put(id, objJson);
    }

}
function btnExcluir_onclick() {
    const id = txtIdCargo.value;
    if (id == "") {
        limparDiv(divResposta);
        divResposta.append(document.createTextNode("Selecione um cargo"));
    } else {
        fetch_cargos_delete(id);
    }
}
function btnCancelar_onclick() {
    limparFormulario();
}

function txtFiltro_onkeyup() {
    let filtro = txtFiltro.value;
    construirTabelaCargos(filtro);
}
function limparFormulario() {
    txtIdCargo.value = "";
    txtCargo.value = "";
    limparDiv(divResposta);
}
function ajax_cargo_create(objJsonCargo) {
    //tranforma o objeto json recebido em texto.
    const stringJson = JSON.stringify(objJsonCargo);
    //determina a URI do serviço
    const URI = "/cargos";
    //fetch faz uma requisição
    //envia o token de autorização no cabeçalho  da requisição
    //envia o json do novo cargo no corpo da requisição.
    fetch(URI, {
        method: "POST",
        body: stringJson,
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer <' + TOKEN + '>',
        }
    }).then((response) => { return response.text(); }).then((jsonResposta) => {
        //é execudado quando a api "php" responde.
        console.log("RECEBIDO:", jsonResposta);

        //converte a resposta da api para um objeto json.
        const objetoJson = JSON.parse(jsonResposta);
        if (objetoJson.status == true) {

            limparDiv(divResposta);

            if (objetoJson.status == true) {
                divResposta.append(document.createTextNode("cadastrado com sucesso"));
                limparFormulario();
                //limparTabela(tblCargos);
                fetch_cargos_get();
            } else {
                divResposta.append(document.createTextNode(objetoJson.msg));
            }
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
function fetch_cargos_get(id) {
    const URI = "/cargos";
    const operacaoAssincrona =  fetch(URI, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        }
    });
    operacaoAssincrona.then((response) => {
       return response.text();
    }).then((jsonResposta) => {
        
        console.log("RECEBIDO:", jsonResposta);

        const objetoJson = JSON.parse(jsonResposta);
        if (objetoJson.status == true) {
            CARGOS_JSON = objetoJson.dados;
            construirTabelaCargos();
        } else {
            let codigo = objetoJson.codigo;
            if (codigo == 401) {
                divResposta.append(document.createTextNode("usuário não logado"));
            }
        }

    });
    operacaoAssincrona.catch((error) => {
        console.error("Error:", error);
    });
}

function fetch_cargos_put(id, objJsonCargo) {
    const stringJson = JSON.stringify(objJsonCargo);
    const uri = "/cargos/" + id;
    fetch(uri, {
        method: "PUT",
        body: stringJson,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        }
    }).then((response) => {
        return response.text();
    }).then((jsonResposta) => {
        console.log("RECEBIDO:", jsonResposta);
        const objetoJson = JSON.parse(jsonResposta);
        if (objetoJson.status == true) {
            fetch_cargos_get();
            limparFormulario();
            limparDiv(divResposta);
            divResposta.append(document.createTextNode("atualizado com sucesso"));
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

function fetch_cargos_delete(id) {
    const uri = "/cargos/" + id;
    fetch(uri, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer <' + TOKEN + '>',
        }
    }).then((response) => { return response.text(); }).then((jsonResposta) => {
        console.log("RECEBIDO:", jsonResposta);

        const objetoJson = JSON.parse(jsonResposta);
        if (objetoJson.status == true) {
            limparFormulario();
            limparDiv(divResposta);
            divResposta.append(document.createTextNode("atualizado com sucesso"));
            fetch_cargos_get();
            construirTabelaCargos();
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

function limparTabela(objetoTabela) {
    var qtdLinhas = 1;
    var totalLinhas = objetoTabela.rows.length;
    for (var i = qtdLinhas; i < totalLinhas; i++) {
        objetoTabela.deleteRow(qtdLinhas);
    }
}
function limparDiv(objetoDiv) {
    while (objetoDiv.hasChildNodes() == true) {
        objetoDiv.removeChild(objetoDiv.firstChild);
    }
}

function construirTabelaCargos(filtroNome) {
    limparTabela(tblCargos);
    for (let cargo of CARGOS_JSON) {
        if (filtroNome != null) {
            let nomeCargo = cargo.nomeCargo
            nomeCargo = nomeCargo.toLowerCase();
            filtroNome = filtroNome.toLowerCase();
            let result = nomeCargo.includes(filtroNome);
            if (result == false) {
                continue;
            }
        }
        const linha = document.createElement("tr");
        const colunaIdCargo = document.createElement("td");
        const colunaNomeCargo = document.createElement("td");
        const colunaBotaoSelecionar = document.createElement("td");

        const btnSelecionar = document.createElement("button");
        btnSelecionar.innerText = "Selecionar";
        btnSelecionar.onclick = function () {
            txtIdCargo.value = cargo.idCargo;
            txtCargo.value = cargo.nomeCargo;
        }

        colunaIdCargo.append(document.createTextNode(cargo.idCargo));
        colunaNomeCargo.append(document.createTextNode(cargo.nomeCargo));
        colunaBotaoSelecionar.append(btnSelecionar);

        linha.appendChild(colunaIdCargo);
        linha.appendChild(colunaNomeCargo);
        linha.appendChild(colunaBotaoSelecionar);

        tblCargos.appendChild(linha);

    }

}