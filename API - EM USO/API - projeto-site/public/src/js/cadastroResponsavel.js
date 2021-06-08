var user = sessionStorage.getItem('user');
user = JSON.parse(user);

const cadastroResponsavel = () => {
    checkEmail();
    if (isEqual && hasMin && hasUpper && hasNumber && validEmail) {
        let form = new URLSearchParams(new FormData(form_cadastroResponsavel));
        fetch(`/responsaveis/cadastrar/${user.idEmpresa}`, {
            method: "POST",
            body: form
        }).then(function (response) {

            if (response.ok) {
                console.log(response);
                generateAlert(document.getElementById('body-pg'),
                    null, 'Cadastrado com sucesso!'
                );
            } else {

                console.log('Erro de cadastro!');
                response.text().then(function (error_desc) {
                    console.log(error_desc);
                });

            }
        });
    }
}



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


function checkPassword() {
    let password = cadastroPassword.value;
    let passToValidate = confirmacaoPassword.value;

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

const checkEmail = () => {
    email = document.querySelector('#emailResponsavel');
    if (email.value.match(/^[^\s@]+@[^\s@]+$/)) {
        return validEmail = true;
    }
    else {
        email.parentElement.classList.toggle('wrong-input');
        email.value = '';
        email.placeholder = 'Digite um e-mail válido';

        setTimeout(() => {
            email.parentElement.classList.remove('wrong-input');
            email.style.color = '#FFF';
            email.placeholder = 'Digite um email válido';
        }, 1500);

        return validEmail = false;
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



// FECHAR ALERT DO CADASTRO
function closeAlert(element) {
    if (element.classList.contains('visible')) {
        element.classList.remove('visible');
    }

}