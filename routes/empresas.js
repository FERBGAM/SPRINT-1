var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Empresa = require('../models').Empresa;

let sessoes = [];

/* CADASTRAR EMPRESAS */
router.post('/cadastrarEmpresa', function(req, res, next) {
    console.log('Cadastrando empresa...');

    Empresa.create({
        loginEmpresa: req.body.loginEmpresa,
        senhaEmpresa: req.body.senhaEmpresa,
        nomeEmpresa: req.body.nomeEmpresa,
        cnpj: req.body.cnpjEmpresa,
        telefone: req.body.telefoneEmpresa,
        email: req.body.emailEmpresa,
        logradouro: req.body.logradouroEmpresa,
        uf: req.body.ufEmpresa,
        cidade: req.body.cidadeEmpresa,
        numero: req.body.numeroEmpresa,
        complemento: req.body.complementoEmpresa,
        bairro: req.body.bairroEmpresa,
        cep: req.body.cepEmpresa
    }).then(resultado => {
        console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

/* Recuperar usuário por login e senha */
router.post('/autenticarEmpresa', function(req, res, next) {
    console.log('Recuperando Empresa por login e senha');

    var login = req.body.login_user; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha_user; // depois de .body, use o nome (name) do campo em seu formulário de login	

    let instrucaoSql = `select * from tb_empresa where loginEmpresa='${login}' and senhaEmpresa='${senha}'`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: Empresa
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        if (resultado.length == 1) {
            sessoes.push(resultado[0].dataValues.loginEmpresa);
            console.log('sessoes: ', sessoes);
            res.json(resultado[0]);
        } else if (resultado.length == 0) {
            res.status(403).send('Login e/ou senha inválido(s)');
        } else {
            res.status(403).send('Mais de um usuário com o mesmo login e senha!');
        }

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

/* Verificação de usuário como empresa */
router.get('/sessao/:login', function(req, res, next) {
    let login = req.params.login;
    console.log(`Verificando se o usuário ${login} tem sessão`);

    let tem_sessao = false;
    for (let u = 0; u < sessoes.length; u++) {
        if (sessoes[u] == login) {
            tem_sessao = true;
            break;
        }
    }

    if (tem_sessao) {
        let mensagem = `Usuário ${login} possui sessão ativa!`;
        console.log(mensagem);
        res.send(mensagem);
    } else {
        res.sendStatus(403);
    }

});


/* Logoff de usuário como Empresa */
router.get('/sair/:login', function(req, res, next) {
    let login = req.params.loginEmpresa;
    console.log(`Finalizando a sessão do usuário ${login}`);
    let nova_sessoes = []
    for (let u = 0; u < sessoes.length; u++) {
        if (sessoes[u] != login) {
            nova_sessoes.push(sessoes[u]);
        }
    }
    sessoes = nova_sessoes;
    res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
    console.log('Recuperando todos os usuários');
    Usuario.findAndCountAll().then(resultado => {
        console.log(`${resultado.count} registros`);

        res.json(resultado.rows);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

module.exports = router;