
function existeSessao(){
                
    let token = localStorage.getItem("token");
    let jsonFuncionario = localStorage.getItem("jsonFuncionario");
    if(token==null || jsonFuncionario==null){
        window.location="Login.html"
    }

    console.log(token,jsonFuncionario);
}
existeSessao();