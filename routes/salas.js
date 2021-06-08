var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Sala = require('../models').Sala;
var env = process.env.NODE_ENV || 'development';


//Pegar todas as salas 
router.get('/:idEmpresa', async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const idEmpresa = req.params.idEmpresa;
    let salas;
    let novasSalas = [];

    Sala.findAll({ where: { fkEmpresa: idEmpresa } }).then((response) => {
        salas = response;

        let getSala = new Promise((resolve, reject) => {
            salas.forEach((sala, index, array) => {

                let instrucaoSql = `
                    SELECT sensor.idSensor, sensor.tipoLeitura ,sensor.statusSensor FROM tb_sensor as sensor
                        INNER JOIN tb_sala as sala
                            ON sensor.fkSala = sala.idSala
                        WHERE fkSala = ${sala.idSala};`;

                sequelize.query(instrucaoSql, {
                    model: Sala
                }).then(resultado => {

                    novasSalas.push({
                        idSala: sala.idSala,
                        nomeSala: sala.nomeSala,
                        area: sala.areaSala,
                        descricao: sala.descricao,
                        andar: sala.andar,
                        fkEmpresa: sala.fkEmpresa,
                        sensores: resultado
                    })

                    if (index == array.length - 1) {
                        resolve();
                    }
                })

            });
        })

        getSala.then(() => {
            res.send(novasSalas);
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    })
});



router.get('/leituras/:idSala', (req, res, next) => {

    const idSala = req.params.idSala;

    let instrucaoSql = `
             select l.idLeitura, l.fkSensor, l.valorLeitura, s.tipoLeitura  from tb_leitura as l join tb_sensor as s on fkSensor = idSensor
                join tb_sala on fkSala = idSala
                WHERE idSala = ${idSala}
                order by l.idLeitura DESC LIMIT 3;`;

    sequelize.query(instrucaoSql, {
        model: Sala
    }).then(resultado => {
        res.send(resultado);
    })




});







module.exports = router;