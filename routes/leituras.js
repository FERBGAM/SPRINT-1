var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models/leitura').Leitura;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N leituras */
router.get('/ultimas/:tipoLeitura', function(req, res, next) {

    // quantas são as últimas leituras que quer? 7 está bom?
    const limite_linhas = 8;

    var tipoLeitura = req.params.tipoLeitura;

    console.log(`Recuperando as ultimas ${limite_linhas} leituras`);

    let instrucaoSql = "";

    if (env == 'dev') {
        // abaixo, escreva o select de dados para o Workbench
        instrucaoSql = `
			SELECT l.idLeitura as 'idLeitura', s.fkSala as 'Sala',s.idSensor as 'Sensor', s.tipoLeitura as 'Tipo', s.statusSensor as 'Status', l.valorLeitura as 'Dado', s.unidadeMedida as 'Unidade de Medida', l.dataHoraRegister 'Hora'
			FROM tb_leitura as l
				INNER JOIN tb_sensor as s
				ON l.fkSensor = s.idSensor
			WHERE s.tipoLeitura = '${tipoLeitura}'
			LIMIT ${limite_linhas}`;
    } else if (env == 'production') {
        // abaixo, escreva o select de dados para o SQL Server
        // instrucaoSql = `select top ${limite_linhas} 
        // temperatura, 
        // umidade, 
        // momento,
        // FORMAT(momento,'HH:mm:ss') as momento_grafico
        // from leitura
        // where fkcaminhao = ${idcaminhao}
        // order by id desc`;
    } else {
        console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
    }

    sequelize.query(instrucaoSql, {
            model: tb_leitura,
            mapToModel: true
        })
        .then(resultado => {
            return res.status(200).json(resultado.splice(1));
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});



router.get('/ultimaPorSala/:idSala', function(req, res, next) {

    var idSala = req.params.idSala;

    let instrucaoSql = "";

    if (env == 'dev') {
        // abaixo, escreva o select de dados para o Workbench
        instrucaoSql = `
			select l.idLeitura, l.valorLeitura ,s.tipoLeitura  from tb_leitura as l join tb_sensor as s on fkSensor = idSensor
				join tb_sala on fkSala = idSala
				WHERE idSala = ${idSala}
				ORDER BY l.idLeitura DESC LIMIT 1;`;

    } else if (env == 'production') {
        // abaixo, escreva o select de dados para o SQL Server
        // instrucaoSql = `select top ${limite_linhas} 
        // temperatura, 
        // umidade, 
        // momento,
        // FORMAT(momento,'HH:mm:ss') as momento_grafico
        // from leitura
        // where fkcaminhao = ${idcaminhao}
        // order by id desc`;
    } else {
        console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
    }

    sequelize.query(instrucaoSql, {
            model: Leitura,
            mapToModel: true
        })
        .then(resultado => {
            return res.status(200).json(resultado[0]);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});




router.get('/ultimasPorSala/:idSala/:qtdLeituras', function(req, res, next) {

    var idSala = req.params.idSala;
    let qtdLeituras = req.params.qtdLeituras;

    let instrucaoSql = "";

    if (env == 'dev') {
        // abaixo, escreva o select de dados para o Workbench
        instrucaoSql = `
			select l.idLeitura, l.valorLeitura ,s.tipoLeitura  from tb_leitura as l join tb_sensor as s on fkSensor = idSensor
				join tb_sala on fkSala = idSala
				WHERE idSala = ${idSala}
				ORDER BY l.idLeitura DESC LIMIT ${qtdLeituras};`;

    } else if (env == 'production') {
        instrucaoSql = `
			SELECT TOP ${qtdLeituras} l.idLeitura, l.valorLeitura ,s.tipoLeitura  from tb_leitura as l join tb_sensor as s on fkSensor = idSensor
				join tb_sala on fkSala = idSala
				WHERE idSala = ${idSala}
				ORDER BY l.idLeitura DESC;`;
    } else {
        console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
    }

    sequelize.query(instrucaoSql, {
            model: Leitura,
            mapToModel: true
        })
        .then(resultado => {
            return res.status(200).json(resultado[0]);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});



router.get('/tempo-real/:idcaminhao', function(req, res, next) {
    console.log('Recuperando caminhões');

    //var idcaminhao = req.body.idcaminhao; // depois de .body, use o nome (name) do campo em seu formulário de login
    var idcaminhao = req.params.idcaminhao;

    let instrucaoSql = "";

    if (env == 'dev') {
        // abaixo, escreva o select de dados para o Workbench
        instrucaoSql = `select temperatura, umidade, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, fkcaminhao from leitura where fkcaminhao = ${idcaminhao} order by id desc limit 1`;
    } else if (env == 'production') {
        // abaixo, escreva o select de dados para o SQL Server
        instrucaoSql = `select top 1 temperatura, umidade, FORMAT(momento,'HH:mm:ss') as momento_grafico, fkcaminhao from leitura where fkcaminhao = ${idcaminhao} order by id desc`;
    } else {
        console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
    }

    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
        .then(resultado => {
            res.json(resultado[0]);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

// estatísticas (max, min, média, mediana, quartis etc)
router.get('/estatisticas', function(req, res, next) {

    console.log(`Recuperando as estatísticas atuais`);

    const instrucaoSql = `select 
							max(temperatura) as temp_maxima, 
							min(temperatura) as temp_minima, 
							avg(temperatura) as temp_media,
							max(umidade) as umidade_maxima, 
							min(umidade) as umidade_minima, 
							avg(umidade) as umidade_media 
						from leitura`;


    sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
        .then(resultado => {
            res.json(resultado[0]);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });

});


module.exports = router;