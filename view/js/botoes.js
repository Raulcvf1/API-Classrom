//cria um objeto para cada elemento html que é utilizado no script
const btnHome = document.getElementById("btnHome");
const btnVoltar = document.getElementById("btnVoltar");

//vincula a função  onclick_btnLogin() ao click do botao de login
btnHome.onclick = onclick_btnHome;
btnVoltar.onclick = onclick_btnVoltar;

function onclick_btnHome() {
    window.location = "PainelTurma.html";
}

function onclick_btnVoltar() {
    window.location = "PainelDisciplina.html";
}