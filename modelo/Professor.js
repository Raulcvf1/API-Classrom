//
var md5 = require("md5"); //npm install md5 --save  //https://www.npmjs.com/package/md5

module.exports = class Professor {
  constructor(banco) {
    this.banco = banco;
    this.registro = null;
    this.nome = null;
    this.email = null;
    this.senha = null;
    this.tipo = null;
  }

  async create() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const registro = this.getRegistro();
      const nome = this.getNome();
      const email = this.getEmail();
      const senha = md5(this.getSenha());
      const tipo = this.getTipo();

      const params = [registro, nome, email, senha, tipo];

      let sql =
        "INSERT INTO professor (registro, nome, email, senha, tipo) VALUES (?, ?, ?, ?, ?);";

      this.banco.query(sql, params, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return operacaoAssincrona;
  }
  async read() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const registro = this.getRegistro();
      let params = [registro];
      let SQL = "";
      console.log(registro);
      if (registro == null) {
        SQL =
          "SELECT registro, nome, email, tipo FROM colegiosunivap.professor;";
      } else {
        SQL =
          "SELECT registro, nome, email, tipo FROM colegiosunivap.professor WHERE registro = ?;";
      }
      this.banco.query(SQL, params, function (error, result) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return operacaoAssincrona;
  }

  async update() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const registro = this.getRegistro();
      const nome = this.getNome();
      const email = this.getEmail();
      const senha = md5(this.getSenha());
      const tipo = this.getTipo();

      let parametros = [nome, email, senha, tipo, registro];
      let sql =
        "update professor set nome=? ,email=? ,senha=?,tipo = ? where registro = ?;";
      this.banco.query(sql, parametros, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return operacaoAssincrona;
  }

  async delete() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const registro = this.getRegistro();
      let parametros = [registro];
      let sql = "delete from professor where registro = ?;";
      this.banco.query(sql, parametros, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return operacaoAssincrona;
  }

  async login() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const email = this.getEmail();
      const senha = md5(this.getSenha());
      let parametros = [email, senha];
      let sql =
        "SELECT COUNT(*) AS qtd, registro, nome, email FROM colegiosunivap.professor WHERE email = ? AND senha = ?;";

      const result = this.banco.query(sql, parametros, (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result[0].qtd == 1) {
            const resposta = {
              status: true,
              registro: result[0].registro,
              nome: result[0].nome,
              email: result[0].email,
            };
            resolve(resposta);
          } else {
            const resposta = {
              status: false,
            };
            resolve(resposta);
          }
        }
      });
    });
    return operacaoAssincrona;
  }

  setRegistro(registroProfessor) {
    this.registro = registroProfessor;
  }
  getRegistro() {
    return this.registro;
  }
  setNome(name) {
    this.nome = name;
  }
  getNome() {
    return this.nome;
  }
  setEmail(email) {
    this.email = email;
  }
  getEmail() {
    return this.email;
  }

  setSenha(senha) {
    this.senha = senha;
  }
  getSenha() {
    return this.senha;
  }
  setTipo(tipoProfessor) {
    this.tipo = tipoProfessor;
  }
  getTipo() {
    return this.tipo;
  }
};
