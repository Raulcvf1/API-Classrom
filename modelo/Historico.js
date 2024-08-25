module.exports = class Historico {

    constructor(banco) {
        this.banco = banco; 
        this.nota_id = {
            idnota: null
        }
        this.nota = null;
        this.ultimaalteracao = null;
    }

    async create() {
        const operacaoAssincrona = new Promise((resolve, reject) => {

            const nota_id = this.getNota_id();
            const Nota_idNota = nota_id.idnota;
            const nota = this.getNota();
            const ultimaAlteracao = this.getUltimaalteracao();

            console.log("ESTOU AQUI OI")

            console.log(Nota_idNota);
            console.log(ultimaAlteracao);

            const params = [Nota_idNota, nota, ultimaAlteracao];

            let sql = "INSERT INTO historicoalteracoes (Nota_idNota, nota, ultimaAlteracao) VALUES (?, ?, ?);";

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

            const nota_id = this.getNota_id();
            const Nota_idNota = nota_id.idnota;
            let params = [Nota_idNota];
            let SQL = "";

            console.log(Nota_idNota);

            if (Nota_idNota == null) {
                SQL = "SELECT * FROM colegiosunivap.historicoalteracoes;";
            } else {
                SQL = "SELECT * FROM colegiosunivap.historicoalteracoes WHERE Nota_idNota = ?;";
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

            const nota_id = this.getNota_id();
            const Nota_idNota = nota_id.idnota;
            const nota = this.getNota();
            const ultimaAlteracao = this.getUltimaalteracao();

            console.log("ESTOU AQUI OI")

            console.log(Nota_idNota);
            console.log(ultimaAlteracao);

            const parametros = [nota, ultimaAlteracao, Nota_idNota];

            let sql = "update historicoalteracoes set nota=? ,ultimaAlteracao=? where Nota_idNota = ?;";
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

            const nota_id = this.getNota_id();
            const Nota_idNota = nota_id.idnota;

            let parametros = [Nota_idNota];
            let sql = "delete from colegiosunivap.historicoalteracoes where Nota_idNota = ?;";
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

    setNota_id(novoId) {
        this.nota_id = novoId;
    }
    getNota_id() {
        return this.nota_id;
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
}

