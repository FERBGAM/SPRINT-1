// GLOBAIS
let equalPass = document.querySelector('#equal-pass')
let minChar = document.querySelector('#minChar');
let upperCase = document.querySelector('#upperCase');
let numericChar = document.querySelector('#numericChar');
let isEqual = false;
let hasMin = false;
let hasUpper = false;
let hasNumber = false;
let validEmail = false;
let sign_in_btn = document.querySelector('#sign-in-btn');
let sign_up_btn = document.querySelector('#sign-up-btn');
let container = document.querySelector('.container');


// REQUISIÇÃO DE CADASTRO
cadastrar = () => {
    if (validationStepThree()) {
        var signData = new URLSearchParams(new FormData(form_cadastro));
        fetch("/empresas/cadastrarEmpresa", {
            method: "POST",
            body: signData
        }).then(function(response) {

            if (response.ok) {
                console.log(response);
                generateAlert(document.getElementById('container'),
                    null, 'Cadastrado com sucesso!'
                );

                container.classList.remove('sign-up-mode');

            } else {
                console.log('Erro de cadastro!');
                response.text().then(function(error_desc) {
                    console.log(error_desc);

                    generateAlert(document.getElementById('container'),
                        'warning', 'Erro ao cadastrar'
                    );

                });

            }
        });
    }
}



// CONTROLE DAS ETAPAS DE CADASTRO
let step = 1;
next = () => {

    let firstStep = document.querySelector('.first-step');
    let secondStep = document.querySelector('.second-step');
    var btnCadastro = document.getElementById('signButton');
    var progressBar = document.getElementById('progress');

    if (!firstStep.classList.contains('invisible')) {
        if (validationStepOne()) {
            firstStep.classList.add('invisible');
            firstStep.nextElementSibling.classList.toggle('invisible');
            progressBar.classList.toggle('progressTwo');
            step++;
        }
    } else {
        switch (step) {
            case 2:
                if (validationStepTwo()) {
                    btnCadastro.value = 'Cadastrar';
                    secondStep.classList.add('invisible');
                    secondStep.nextElementSibling.classList.toggle('invisible');
                    progressBar.classList.toggle('progressTwo');
                    progressBar.classList.add('progressThree');
                    step++
                }
                break;
            case 3:
                btnCadastro.onclick = '';
                btnCadastro.type = 'submit';
                break;
        }
    }
}




let previous = () => {

    var progressBar = document.getElementById('progress');
    let firstStep = document.querySelector('.first-step');
    let secondStep = document.querySelector('.second-step');
    let thirdStep = document.querySelector('.third-step');

    if (step != 1) {
        switch (step) {
            case 3:
                thirdStep.classList.toggle('invisible');
                secondStep.classList.toggle('invisible');
                progressBar.classList.toggle('progressThree');
                progressBar.classList.toggle('progressTwo')
                step--;
                break;
            case 2:
                secondStep.classList.toggle('invisible');
                firstStep.classList.toggle('invisible');
                progressBar.classList.toggle('progressTwo');
                step--;
                break;
        }
    }
}


// MAPEANDO AS INPUTS DO FORM DE CADASTRO

let nomeEmpresa = document.getElementById('nomeEmpresa');
let cnpj = document.getElementById('cnpjEmpresa');
let telefoneEmpresa = document.getElementById('telEmpresa');
let emailEmpresa = document.getElementById('emailEmpresa');
let cep = document.getElementById('cepEmpresa');
let logradouro = document.getElementById('logradouroEmpresa');
let uf = document.getElementById('selectUF');
let cidade = document.getElementById('cidadeEmpresa');
let bairro = document.getElementById('bairroEmpresa');
let numero = document.getElementById('numeroEmpresa');
let complemento = document.getElementById('complementoEmpresa');
let loginName = document.getElementById('userCadastro');
let passwordInput = document.querySelector('#cadastroPassword');
let passToValidateInput = document.querySelector('#confirmacaoPassword');


// ============================================== VALIDAÇÕES =========================================================

// STEP 1 - VALIDAÇÃO
function validationStepOne() {
    if (nomeEmpresa.value == '' || nomeEmpresa == undefined) {
        nomeEmpresa.parentElement.classList.toggle('wrong-input');
        nomeEmpresa.value = '';
        nomeEmpresa.placeholder = 'Digite um nome válido';

        setTimeout(() => {
            nomeEmpresa.parentElement.classList.remove('wrong-input');
            nomeEmpresa.style.color = '#FFF';
            nomeEmpresa.placeholder = 'Empresa';
        }, 1500);
        return false;
    } else if (!cnpj.value.match(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/g)) {
        cnpj.parentElement.classList.toggle('wrong-input');
        cnpj.value = '';
        cnpj.placeholder = 'Digite um CNPJ válido';

        setTimeout(() => {
            cnpj.parentElement.classList.remove('wrong-input');
            cnpj.style.color = '#FFF';
            cnpj.placeholder = 'CNPJ';
        }, 1500);
        return false;
    } else if (telefoneEmpresa.value == '' || telefoneEmpresa.length > 11 || telefoneEmpresa.length < 10) {
        telefoneEmpresa.parentElement.classList.toggle('wrong-input');
        telefoneEmpresa.value = '';
        telefoneEmpresa.placeholder = 'Digite um telefone válido';

        setTimeout(() => {
            telefoneEmpresa.parentElement.classList.remove('wrong-input');
            telefoneEmpresa.style.color = '#FFF';
            telefoneEmpresa.placeholder = 'Telefone';

        }, 1500);
        return false;
    } else if (!emailEmpresa.value.match(/^[^\s@]+@[^\s@]+$/) || emailEmpresa.value == '') {
        emailEmpresa.parentElement.classList.toggle('wrong-input');
        emailEmpresa.value = '';
        emailEmpresa.placeholder = 'Digite um e-mail válido';

        setTimeout(() => {
            emailEmpresa.parentElement.classList.remove('wrong-input');
            emailEmpresa.style.color = '#FFF';
            emailEmpresa.placeholder = 'Digite um email válido';
        }, 1500);
        return false;
    } else {
        return true;
    }
}

// STEP 2 - VALIDAÇÃO

function validationStepTwo() {
    if (cep.value == '' || cep == undefined || cep.value.length != 8) {
        cep.parentElement.classList.toggle('wrong-input');
        cep.value = '';
        cep.placeholder = 'Digite um cep válido';

        setTimeout(() => {
            cep.parentElement.classList.remove('wrong-input');
            cep.style.color = '#FFF';
            cep.placeholder = 'CEP';
        }, 1500);
        return false;
    } else if (logradouro.value == '' || logradouro == undefined) {
        logradouro.parentElement.classList.toggle('wrong-input');
        logradouro.value = '';
        logradouro.placeholder = 'Digite um logradouro válido';

        setTimeout(() => {
            logradouro.parentElement.classList.remove('wrong-input');
            logradouro.style.color = '#FFF';
            logradouro.placeholder = 'Logradouro';
        }, 1500);
        return false;
    } else if (uf.value == '' || uf == undefined || uf.value.length != 2) {
        uf.parentElement.classList.toggle('wrong-input');

        setTimeout(() => {
            uf.parentElement.classList.remove('wrong-input');
            uf.style.color = '#FFF';
        }, 1500);
        return false;
    } else if (cidade.value == '' || cidade == undefined) {
        cidade.parentElement.classList.toggle('wrong-input');
        cidade.value = '';
        cidade.placeholder = 'Digite uma cidade válida';

        setTimeout(() => {
            cidade.parentElement.classList.remove('wrong-input');
            cidade.style.color = '#FFF';
            cidade.placeholder = 'Cidade';

        }, 1500);
        return false;
    } else if (bairro.value == '' || bairro == undefined) {
        bairro.parentElement.classList.toggle('wrong-input');
        bairro.value = '';
        bairro.placeholder = 'Digite um bairro válido';

        setTimeout(() => {
            bairro.parentElement.classList.remove('wrong-input');
            bairro.style.color = '#FFF';
            bairro.placeholder = 'Bairro';

        }, 1500);
        return false;
    } else if (numero.value == '' || isNaN(numero.value)) {
        numero.parentElement.classList.toggle('wrong-input');
        numero.value = '';
        numero.placeholder = 'Digite um numero válido';

        setTimeout(() => {
            numero.parentElement.classList.remove('wrong-input');
            numero.style.color = '#FFF';
            numero.placeholder = 'Número';
        }, 1500);
        return false;
    } else {
        return true;
    }
}



//STEP 3 VALIDAÇÃO
function validationStepThree() {
    if (loginName.value.length < 4 || loginName.value == '' || loginName.value.indexOf(' ') >= 0) {
        loginName.parentElement.classList.add('wrong-input');
        loginName.value = '';
        loginName.placeholder = 'Digite um válido';
        setTimeout(() => {
            loginName.parentElement.classList.remove('wrong-input');
            loginName.placeholder = 'Login';

        }, 1500);
        return false;
    } else if (!(hasMin && hasNumber && hasUpper && isEqual)) {

        passwordInput.parentElement.classList.add('wrong-input');
        passToValidateInput.parentElement.classList.add('wrong-input');

        setTimeout(() => {
            passwordInput.parentElement.classList.remove('wrong-input');
            passToValidateInput.parentElement.classList.remove('wrong-input');

        }, 1500);
        return false
    } else {
        return true;
    }
}



function checkPassword() {
    let password = passwordInput.value;
    let passToValidate = passToValidateInput.value;

    if (password != '' && password != '') {
        if (password == passToValidate) {
            equalPass.classList.replace('far', 'fas');
            equalPass.classList.add('checked');
            isEqual = true;
        } else {
            equalPass.classList.replace('fas', 'far');
            equalPass.classList.remove('checked');
            isEqual = false;
        }


    } else {
        if (equalPass.classList.contains('checked')) {
            equalPass.classList.replace('fas', 'far');
            equalPass.classList.remove('checked');
            isEqual = false;
        }
    }




    if (isEqual || !isEqual) {
        if (password.length > 3) {
            minChar.classList.replace('far', 'fas');
            minChar.classList.add('checked');
            hasMin = true;
        } else {
            minChar.classList.replace('fas', 'far');
            minChar.classList.remove('checked');
            hasMin = false;
        }

        if (password.toString().search(/[A-Z]/g) != -1) {
            upperCase.classList.replace('far', 'fas');
            upperCase.classList.add('checked');
            hasUpper = true;
        } else {
            upperCase.classList.replace('fas', 'far');
            upperCase.classList.remove('checked');
            hasUpper = false;
        }

        if (password.toString().search(/[0-9]/g) != -1) {
            numericChar.classList.replace('far', 'fas');
            numericChar.classList.add('checked');
            hasNumber = true;
        } else {
            numericChar.classList.replace('fas', 'far');
            numericChar.classList.remove('checked');
            hasNumber = false;
        }




    } else {
        if (minChar.classList.contains('checked')) {
            minChar.classList.replace('fas', 'far');
            minChar.classList.remove('checked');
            hasMin = false;
        }

        if (upperCase.classList.contains('checked')) {
            upperCase.classList.replace('fas', 'far');
            upperCase.classList.remove('checked');
            hasUpper = false;
        }


        if (numericChar.classList.contains('checked')) {
            numericChar.classList.replace('fas', 'far');
            numericChar.classList.remove('checked');
            hasNumber = false;
        }
    }
}

function clearCadastro() {
    nomeEmpresa.value = '';
    cnpj.value = '';
    telefoneEmpresa.value = '';
    emailEmpresa.value = '';
    cep.value = '';
    logradouro.value = '';
    uf.value = '';
    cidade.value = '';
    bairro.value = '';
    numero.value = '';
    complemento.value = '';

    equalPass.classList.replace('fas', 'far');
    equalPass.classList.remove('checked');
    isEqual = false;

    minChar.classList.replace('fas', 'far');
    minChar.classList.remove('checked');
    hasMin = false;

    upperCase.classList.replace('fas', 'far');
    upperCase.classList.remove('checked');
    hasUpper = false;


    numericChar.classList.replace('fas', 'far');
    numericChar.classList.remove('checked');
    hasNumber = false;

}


// essa forma de pegar os elementos é mais precisa, mas funciona da mesma forma que
// aprendemos com o Frizza




// console.log(container)
sign_up_btn.addEventListener('click', function() {
    container.classList.add('sign-up-mode')
});

sign_in_btn.addEventListener('click', function() {
    container.classList.remove('sign-up-mode');
});

// FECHAR ALERT DO CADASTRO
function closeAlert(element) {
    if (element.classList.contains('visible')) {
        element.classList.remove('visible');
    }

}



pesquisar = () => {
    console.log('iniciando a consulta...');

    let viacep = cepEmpresa.value.toString();

    let cepvia = 'https://viacep.com.br/ws/' + viacep + '/json/';

    if (!cep.value.match(/^[0-9]*$/)) {
        cep.parentElement.classList.toggle('wrong-input');
        cep.value = '';
        cep.placeholder = 'Digite um cep válido';

        setTimeout(() => {
            cep.parentElement.classList.remove('wrong-input');
            cep.style.color = '#FFF';
            cep.placeholder = 'CEP';
        }, 1500);

    } else if (viacep.length == 8) {

        fetch(`${cepvia}`)

        .then(resposta => {
            resposta.json()
                .then(json => {

                    if (json.erro == undefined || json.erro == null) {

                        console.log(json)

                        logradouroEmpresa.value = json.logradouro;
                        selectUF.value = json.uf;
                        cidadeEmpresa.value = json.localidade;
                        bairroEmpresa.value = json.bairro;

                    }

                });
        })
    }
}