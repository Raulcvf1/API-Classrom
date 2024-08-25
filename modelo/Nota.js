module.exports = class Nota {
  constructor(banco) {
    this.banco = banco;
    this.idnota = null;
    this.disciplina = {
      iddisciplina: null,
    };
    this.aluno = {
      matricula: null,
    };
    this.bimestre = null;
    this.nota = null;
    this.ultimaalteracao = null;
    this.tiponota = null;
    this.fezlista = null;
  }

  async create() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const disc = this.getDisciplina();
      const id_disc = disc.idDisciplina;

      console.log("ESSE DAQUI EH O CODIGO DA DISCIPLINA: " + id_disc);

      const alun = this.getAluno();
      const matricula_alun = alun.matricula;

      const bimestre = this.getBimestre();
      const nota = this.getNota();
      const ultimaaAlteracao = this.getUltimaalteracao();
      const tiponota = this.getTiponota();
      const fezlista = this.getFezlista();

      const params = [
        id_disc,
        matricula_alun,
        bimestre,
        nota,
        ultimaaAlteracao,
        tiponota,
        fezlista,
      ];

      let sql =
        "INSERT INTO nota (Disciplina_idDisciplina, Aluno_matricula, bimestre, nota, ultimaAlteracao, tipoNota, fezLista) VALUES (?, ?, ?, ?, ?, ?, ?);";

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
      const idNota = this.getIdnota();
      let params = [idNota];
      let SQL = "";

      if (idNota == null) {
        SQL = "SELECT * FROM colegiosunivap.Nota;";
      } else {
        SQL = "SELECT * FROM colegiosunivap.Nota WHERE idNota = ?;";
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

  async read_disciplina_id() {
    const operacaoAssincrona = new Promise((resolve, reject) => {
      const disc = this.getDisciplina();
      const id_disc = disc.idDisciplina;

      console.log(id_disc);

      let params = [id_disc];
      let SQL = "";

      SQL =
        "select idNota, Aluno_matricula, bimestre, nota, ultimaAlteracao, tipoNota, fezLista from colegiosunivap.nota where Disciplina_idDisciplina = ?;";

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

  async read_detalhas_aluno_nota() {
    const operacaoAssincrona = new Promise((resolve, reject) => {

      const alun = this.getAluno();
      const matricula_alun = alun.matricula;
      const bimestre = this.getBimestre();


      let params = [matricula_alun, bimestre];

      let SQL = "select Aluno_matricula, bimestre, nota, fezLista, tipoNota from colegiosunivap.nota where Aluno_matricula = ? and bimestre = ?;";

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
      const idNota = this.getIdnota();

      const disc = this.getDisciplina();
      const id_disc = disc.idDisciplina;

      console.log(id_disc);

      const alun = this.getAluno();
      const matricula_alun = alun.matricula;

      const bimestre = this.getBimestre();
      const nota = this.getNota();
      const ultimaaAlteracao = this.getUltimaalteracao();
      const tiponota = this.getTiponota();
      const fezlista = this.getFezlista();

      const parametros = [
        id_disc,
        matricula_alun,
        bimestre,
        nota,
        ultimaaAlteracao,
        tiponota,
        fezlista,
        idNota,
      ];
      let sql =
        "update nota set Disciplina_idDisciplina=? ,Aluno_matricula=? ,bimestre=? ,nota=?, ultimaAlteracao=? ,tipoNota =?, fezLista=? where idNota = ?;";
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
      const idNota = this.getIdnota();
      let parametros = [idNota];
      let sql = "delete from nota where idNota = ?;";
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

  setIdnota(novoId) {
    this.idnota = novoId;
  }
  getIdnota() {
    return this.idnota;
  }
  setDisciplina(novoDisciplina) {
    this.disciplina = novoDisciplina;
  }
  getDisciplina() {
    return this.disciplina;
  }
  setAluno(novoAluno) {
    this.aluno = novoAluno;
  }
  getAluno() {
    return this.aluno;
  }
  setBimestre(novoBimestre) {
    this.bimestre = novoBimestre;
  }
  getBimestre() {
    return this.bimestre;
  }
  setNota(novoNota) {
    this.nota = novoNota;
  }
  getNota() {
    return this.nota;
  }
  setUltimaalteracao(novoAlteracao) {
    this.ultimaalteracao = novoAlteracao;
  }
  getUltimaalteracao() {
    return this.ultimaalteracao;
  }
  setTiponota(novoTipo) {
    this.tiponota = novoTipo;
  }
  getTiponota() {
    return this.tiponota;
  }
  setFezlista(novoLista) {
    this.fezlista = novoLista;
  }
  getFezlista() {
    return this.fezlista;
  }
};
