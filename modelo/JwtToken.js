
const _jwt = require('jsonwebtoken'); // npm install jsonwebtoken --save        https://www.npmjs.com/package/jsonwebtoken
module.exports = class JwtToken {
  Jsonwebtoken = _jwt;
  JWT_KEY = "09ac8db5a84d6cfd979521700cb600fa";
  JWT_DURACAO = 60 * 60 * 24
  constructor() {

  }
  gerarToken(payload) {

    const novoToken = this.Jsonwebtoken.sign({ data: payload },
      this.JWT_KEY,
      { expiresIn: this.JWT_DURACAO });
    //console.log("entrou:" ,  novoToken)
    return novoToken;
  }
  validarToken(token) {

    const retorno = {
      status: false,
      dados: null
    }
    if (token == null) {  
      return retorno;
    }
    if (token == "") {
      return retorno
    }
    let TokenArray = token.split(" ");
    token = TokenArray[1]
    token = token.replace("<", "");
    token = token.replace(">", "");
    console.log(token);
    try {
      var decoded = this.Jsonwebtoken.verify(token, this.JWT_KEY);
      retorno.status = true;
      retorno.dados = decoded;
      return retorno;
    } catch (err) {
      //console.log(err);
      return retorno;
    }
  }
}

