module.exports = class Revisao {

    constructor(banco) {
        this.banco = banco;
        this.idPedidoRevisao = null;
        this.nota = {
            idnota: null
        }
        this.descricao = null;
        this.status = null;
    }

    async create() {
        const operacaoAssincrona = new Promise((resolve, reject) => {

            const nota = this.getNota();
            const Nota_idNota = nota.idnota;
            const descricao = this.getDescricao();
            const status = this.getStatus();
            console.log("ESTOU AQUI OI")
            console.log(nota);
            console.log(Nota_idNota);

            const params = [Nota_idNota, descricao, status];

            let sql = "INSERT INTO pedidorevisao (Nota_idNota, descricao, status) VALUES (?, ?, ?);";

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

            const idPedidoRevisao = this.getIdpedidorevisao();
            let params = [idPedidoRevisao];
            let SQL = "";

            if (idPedidoRevisao == null) {
                SQL = "SELECT * FROM colegiosunivap.pedidorevisao;";
            } else {
                SQL = "SELECT * FROM colegiosunivap.pedidorevisao WHERE idPedidoRevisao = ?;";
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

            const nota = this.getNota();
            const Nota_idNota = nota.idnota;
            const descricao = this.getDescricao();
            const status = this.getStatus();
            const idPedidoRevisao = this.getIdpedidorevisao();

            const parametros = [Nota_idNota, descricao, status, idPedidoRevisao];
            let sql = "update pedidorevisao set Nota_idNota=? ,descricao=? ,status=? where idPedidoRevisao = ?;";
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
            const idPedidoRevisao = this.getIdpedidorevisao();
            let parametros = [idPedidoRevisao];
            let sql = "delete from pedidorevisao where idPedidoRevisao = ?;";
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

    setIdpedidorevisao(novoId) {
        this.idPedidoRevisao = novoId
    }
    getIdpedidorevisao() {
        return this.idPedidoRevisao
    }
    setNota(novoNota) {
        this.nota = novoNota;
    }
    getNota() {
        return this.nota;
    }
    setDescricao(novoDescricao) {
        this.descricao = novoDescricao;
    }
    getDescricao() {
        return this.descricao;
    }
    setStatus(novoStatus) {
        this.status = novoStatus;
    }
    getStatus() {
        return this.status;
    }
}

