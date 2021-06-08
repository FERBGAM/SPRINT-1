var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;
var env = process.env.NODE_ENV || 'development';

const { ArduinoDataTemp } = require("../app-sensores/newserial");
const { ArduinoDataHumidity } = require("../app-sensores/serialHumidity");

const { ArduinoDataSwitch } = require("../app-sensores/serialSwitch");
const { ArduinoDataLuminosity } = require("../app-sensores/serialLuminosidity");

router.get("/sendData/:vetorSalas", (request, response) => {
    //MUDEI PRA PERMITIR QUE O LOCALHOST:3000 ACESSE A ROTA COM PASSAGEM DE PARÂMETROS!!!!! PS: a
    response.setHeader('Access-Control-Allow-Origin', '*');


    function lm35(min, max) {
        min = typeof min == 'undefined' ? 5 : min;
        max = typeof max == 'undefined' ? 30 : max;

        let random = Math.random() * (max - min) + min;

        return random
    }

    const temperature = lm35(5, 40);
    const Humidity = ArduinoDataHumidity.List[ArduinoDataHumidity.List.length - 1];
    const luminosidade = ArduinoDataLuminosity.List[ArduinoDataLuminosity.List.length - 1]

    let vetorSalas = request.params.vetorSalas;

    var instrucaoSql = "";
    vetorSalas = JSON.parse(vetorSalas);
    vetorSalas = Array.from(vetorSalas);



    setInstrucao = (dbo) => {
        if (dbo != undefined && dbo != '' && dbo != null) {




            instrucaoSql = `INSERT into tb_leitura (fkSensor, dataHoraRegister, valorLeitura)
            values 
            
            (1,default,'${Humidity + 20}'),
            (1,default,'${temperature + 30}'),
            (1,default,'${temperature + 5}');`;
        } else {

            vetorSalas.forEach(sala => {
                sala.sensores.forEach(sensor => {
                    if (sensor.statusSensor == 'ativo') {
                        let valorLeitura = 0;

                        if (sensor.tipoLeitura == "temperatura") {
                            valorLeitura = temperature;
                        } else if (sensor.tipoLeitura == 'umidade') {
                            valorLeitura = Humidity;
                        } else {
                            valorLeitura = luminosidade;
                        }

                        instrucaoSql = `INSERT into tb_leitura (fkSensor, dataHoraRegister, valorLeitura) 
                        values  
                            (${sensor.idSensor},default,${valorLeitura});
                        `;

                        sequelize.query(instrucaoSql, {
                            model: Leitura,
                            mapToModel: true
                        }).then(resultado => {
                            console.log(`\n\nRegistro inserido com sucesso!\nO comando executado foi como abaixo:\n`);
                            console.log(instrucaoSql)
                            console.log(`\nFim do comando SQL executado.`);
                        }).catch(erro => {
                            console.error(erro);
                            response.status(500).send(erro.message);
                        });
                    }

                })
            });
        }
    }

    setInstrucao();


    response.send({ text: 'Dados sendo inseridos' });

    // sequelize.query(instrucaoSql, {
    //     //model: Leitura,
    //     //mapToModel: true
    // }).then(resultado => {
    //     console.log(`\n\nRegistro inserido com sucesso!\nO comando executado foi como abaixo:\n`);
    //     console.log(instrucaoSql)
    //     console.log(`\nFim do comando SQL executado.`);
    //     response.status(200).send("Dado inserido com sucesso.");
    // }).catch(erro => {
    //     console.error(erro);
    //     response.status(500).send(erro.message);
    // });
});

function agora() {
    const agora_d = new Date();
    return `${agora_d.getFullYear()}-${agora_d.getMonth() + 1}-${agora_d.getDate()} ${agora_d.getHours()}:${agora_d.getMinutes()}:${agora_d.getSeconds()}`;
}

module.exports = router;