// import generateAlert from "./alerts.js";

// FUNÇÃO QUE VERIFICA O TIPO DE LOGIN
function login() {
    var radioBtn = document.getElementById('radio_empresa');
    let form = new URLSearchParams(new FormData(form_login));

    if (radioBtn.checked) {
        loginEmpresa(form);
    } else {
        loginResponsavel(form);
    }
}






// FUNÇÃO QUE FAZ A REQUISIÇÃO DE LOGIN COMO EMPRESA
function loginEmpresa(form) {
    fetch("/empresas/autenticarEmpresa", {
        method: "POST",
        body: form
    }).then(response => {

        if (response.ok) {

            response.json().then(json => {

                delete json.senhaEmpresa;

                sessionStorage.setItem('user', JSON.stringify(json))
                window.location.href = 'dashboard.html';
            });

        } else {
            console.log('Erro de login!');

            generateAlert(document.getElementById('container'), 'danger', 'Usuário ou senha inválidos!')

        }
    });

    return false;
}

// FUNÇÃO QUE FAZ A REQUISIÇÃO DE LOGIN COMO RESPONSÁVEL
function loginResponsavel(form) {
    fetch("/responsaveis/autenticarResponsavel", {
        method: "POST",
        body: form
    }).then(response => {

        if (response.ok) {

            response.json().then(json => {
                delete json.senhaResponsavel;

                sessionStorage.setItem('user', JSON.stringify(json))
                window.location.href = 'dashboard.html';
            });

        } else {
            console.log('Erro de login!');
            generateAlert(document.getElementById('container'), 'danger', 'Usuário ou senha inválidos!')

        }
    });

    return false;
}