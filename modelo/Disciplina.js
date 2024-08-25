module.exports = class Disciplina {
  constructor(banco) {
    this.banco = banco;
    this.idDisciplina = null;
    this.nome = null;
    this.professor = {
      registro: null,
    };
    this.turma = {
      idTurma: null,
    };
  }

  async create() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const nome = this.getNome();
      const prof = this.getProfessor();
      const prof_registro = prof.registro;
      const turma = this.getTurma();
      const turma_idturma = turma.idTurma;

      console.log(prof_registro);
      console.log(turma_idturma);

      const params = [nome, turma_idturma, prof_registro];

      let sql =
        "INSERT INTO disciplina (nome, Professor_registro, Turma_idTurma) VALUES (?, ?, ?);";

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
      const idDisciplina = this.getIddisciplina();
      let params = [idDisciplina];
      let SQL = "";

      if (idDisciplina == null) {
        SQL = "SELECT * FROM colegiosunivap.disciplina;";
      } else {
        SQL = "SELECT * FROM colegiosunivap.disciplina WHERE idDisciplina = ?;";
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

  async read_professor_id() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const prof = this.getProfessor();
      const prof_registro = prof.registro;

      const turma = this.getTurma();
      const turma_idturma = turma.idTurma;

      let params = [prof_registro, turma_idturma];
      let SQL = "";

      SQL =
        "select idDisciplina, nome FROM colegiosunivap.disciplina where Professor_registro = ? and Turma_idTurma = ?;";

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
      const iddisciplina = this.getIddisciplina();
      const nome = this.getNome();
      const prof = this.getProfessor();
      const prof_registro = prof.registro;
      const turma = this.getTurma();
      const turma_idturma = turma.idTurma;

      let parametros = [nome, prof_registro, turma_idturma, iddisciplina];
      let sql =
        "update disciplina set nome=? ,Professor_registro=? ,Turma_idTurma=? where idDisciplina = ?;";
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
      const idDisciplina = this.getIddisciplina();
      let parametros = [idDisciplina];
      let sql = "delete from disciplina where idDisciplina = ?;";
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

  setIddisciplina(novoId) {
    this.idDisciplina = novoId;
  }
  getIddisciplina() {
    return this.idDisciplina;
  }
  setNome(name) {
    this.nome = name;
  }
  getNome() {
    return this.nome;
  }
  setProfessor(professor) {
    this.professor = professor;
  }
  getProfessor() {
    return this.professor;
  }
  setTurma(turma) {
    this.turma = turma;
  }
  getTurma() {
    return this.turma;
  }
};
