//recupera o token que foi gravado no local Storage no momento do login.
const TOKEN = localStorage.getItem("token");

//cria um objeto para cada elemento html que é utilizado no script
const btnTurma = document.getElementById("btnTurma");
const txtNome = document.getElementById("txtNome_T");
const txtAbreviacao = document.getElementById("txtAbreviacao");
const txtAno = document.getElementById("txtAno");

//vincula a função  onclick_btnLogin() ao click do botao de login
btnTurma.onclick = onclick_btnTurma;

//função que trata o evento de click do botão
function onclick_btnTurma() {

    //recupera os valores digitados no formulario
    const v_nome = txtNome.value;
    const v_abreviacao = txtAbreviacao.value;
    const v_ano = txtAno.value;
    if(v_nome != "" && v_abreviacao != "" && v_ano != ""){
        //constroi um objeto json que será enviado na requisição
        const objJson = {
            nome: v_nome,
            abreviacao: v_abreviacao,
            ano: v_ano
        }
        //chama a função que enviara os dados para a api que 
        //verificará o login
        console.log(objJson);
        ajax_turma_create(objJson);
    }
}

function ajax_turma_create(objJsonCargo) {
    //tranforma o objeto json recebido em texto.
    const stringJson = JSON.stringify(objJsonCargo);
    //determina a URI do serviço
    const URI = "/turma";
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

    }).catch((error) => {
        console.error("Error:", error);
    });
}