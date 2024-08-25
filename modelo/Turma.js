module.exports = class Turma {
  constructor(banco) {
    this.banco = banco;
    this.idTurma = null;
    this.nome = null;
    this.abreviacao = null;
    this.ano = null;
  }

  async create() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const nome = this.getNome();
      const abreviacao = this.getAbreviacao();
      const ano = this.getAno();

      const params = [nome, abreviacao, ano];

      let sql = "INSERT INTO Turma (nome, abreviacao, ano) VALUES (?, ?, ?);";

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
      const idTurma = this.getIdturma();
      let params = [idTurma];
      let SQL = "";
      console.log(idTurma);
      if (idTurma == null) {
        SQL = "SELECT * FROM colegiosunivap.turma;";
      } else {
        SQL = "SELECT * FROM colegiosunivap.turma WHERE idTurma = ?;";
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

  async read_notas_alunos_turma() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const idTurma = this.getIdturma();
      let params = [idTurma];
      let SQL = "";
      console.log(idTurma);

      SQL = "SELECT " +
                " Nota.*, "+
                " Disciplina.nome AS nome_disciplina, "+
                " Turma.nome AS nome_turma, "+
                " Aluno.nome AS nome_aluno "+
            " FROM " +
                " colegiosUnivap.Nota "+
            " JOIN " +
                " colegiosUnivap.Disciplina ON Nota.Disciplina_idDisciplina = Disciplina.idDisciplina "+
            " JOIN " + 
                " colegiosUnivap.Turma ON Disciplina.Turma_idTurma = Turma.idTurma "+
            " JOIN " +
                " colegiosUnivap.Aluno ON Nota.Aluno_matricula = Aluno.matricula " +
            " WHERE " + 
                " Turma.idTurma = ?";

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
      const idTurma = this.getIdturma();
      const nome = this.getNome();
      const abreviacao = this.getAbreviacao();
      const ano = this.getAno();

      let parametros = [nome, abreviacao, ano, idTurma];
      let sql =
        "update turma set nome=? ,abreviacao=? ,ano=? where idTurma = ?;";
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
      const idTurma = this.getIdturma();
      let parametros = [idTurma];
      let sql = "delete from turma where idTurma = ?;";
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

  setIdturma(novoId) {
    this.idTurma = novoId;
  }
  getIdturma() {
    return this.idTurma;
  }
  setNome(name) {
    this.nome = name;
  }
  getNome() {
    return this.nome;
  }
  setAbreviacao(novoAbreviacao) {
    this.abreviacao = novoAbreviacao;
  }
  getAbreviacao() {
    return this.abreviacao;
  }

  setAno(novoAno) {
    this.ano = novoAno;
  }
  getAno() {
    return this.ano;
  }
};
