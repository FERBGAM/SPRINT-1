let user = sessionStorage.getItem('user');
user = JSON.parse(user);



function loadContent() {
    console.log('Carregando conteudo');
    check_authenticate();

}

const redirect_login = () => window.location.href = 'login.html';

function check_authenticate() {
    if (user == undefined) {
        redirect_login();
    }
    //  else {
    //     validate_session();
    // }
}



function validate_session() {
    fetch(`/empresas/sessao/${user.loginEmpresa}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Sessão :) ', texto);
                });
            } else {
                console.error('Sessão :.( ');
                log_out();
            }
        });
}

function log_out() {
    // finalize_session();
    sessionStorage.clear();
    redirect_login();
}

function finalize_session() {
    fetch(`/empresas/sair/${user.loginEmpresa}`, { cache: 'no-store' });
}






listSensors = (data) => {
    let vectorIcons = ''
    let counterLumi = [0, 0, 0];
    let counterUmi = [0, 0, 0];
    let counterTemp = [0, 0, 0];

    data.sensores.forEach((sensor, index, array) => {


        if (sensor.tipoLeitura == 'temperatura' && sensor.statusSensor == 'ativo') {
            counterTemp[0]++
        } else if (sensor.tipoLeitura == 'temperatura' && sensor.statusSensor == 'inativo') {
            counterTemp[1]++
        } else if (sensor.tipoLeitura == 'temperatura' && sensor.statusSensor == 'manutenção') {
            counterTemp[2]++
        }

        if (sensor.tipoLeitura == 'luminosidade' && sensor.statusSensor == 'ativo') {
            counterLumi[0]++
        } else if (sensor.tipoLeitura == 'luminosidade' && sensor.statusSensor == 'inativo') {
            counterLumi[1]++
        } else if (sensor.tipoLeitura == 'luminosidade' && sensor.statusSensor == 'manutenção') {
            counterLumi[2]++
        }

        if (sensor.tipoLeitura == 'umidade' && sensor.statusSensor == 'ativo') {
            counterUmi[0]++
        } else if (sensor.tipoLeitura == 'umidade' && sensor.statusSensor == 'inativo') {
            counterUmi[1]++
        } else if (sensor.tipoLeitura == 'umidade' && sensor.statusSensor == 'manutenção') {
            counterUmi[2]++
        }



        // for (let i = 0; i < counterLumi.length; i++) {
        //     if (i == 0) {
        //         if (counterLumi[i] > 0) {
        //             vectorIcons += `<i class='far fa-lightbulb luminosidade active'><sub>${counterLumi[i]}</sub></i>`
        //         }
        //     } else if (i == 1) {
        //         if (counterLumi[i] > 0) {
        //             vectorIcons += `<i class='far fa-lightbulb luminosidade inactive'><sub>${counterLumi[i]}</sub></i>`
        //         }
        //     } else if (i == 2) {
        //         if (counterLumi[i] > 0) {
        //             vectorIcons += `<i class='far fa-lightbulb luminosidade attention'><sub>${counterLumi[i]}</sub></i>`
        //         }
        //     }
        // }

    });
    console.log(counterTemp);

    let orderIcons = () => {
        for (let i = 0; i < counterLumi.length; i++) {
            if (counterLumi[i] > 0 && i == 0) {
                vectorIcons += `<i class='far fa-lightbulb luminosidade active'><sub>${counterLumi[i]}</sub></i>`
            }
            if (counterLumi[i] > 0 && i == 1) {
                vectorIcons += `<i class='far fa-lightbulb luminosidade inactive'><sub>${counterLumi[i]}</sub></i>`
            }
            if (counterLumi[i] > 0 && i == 2) {
                vectorIcons += `<i class='far fa-lightbulb luminosidade attention'><sub>${counterLumi[i]}</sub></i>`
            }
        }


        for (let i = 0; i < counterTemp.length; i++) {
            if (counterTemp[i] > 0 && i == 0) {
                vectorIcons += `<i class='fas fa-thermometer-empty temperatura active'><sub>${counterTemp[i]}</sub></i>`
            }
            if (counterTemp[i] > 0 && i == 1) {
                vectorIcons += `<i class='fas fa-thermometer-empty temperatura inactive'><sub>${counterTemp[i]}</sub></i>`
            }
            if (counterTemp[i] > 0 && i == 2) {
                vectorIcons += `<i class='fas fa-thermometer-empty temperatura attention'><sub>${counterTemp[i]}</sub></i>`
            }
        }



        for (let i = 0; i < counterUmi.length; i++) {
            if (counterUmi[i] > 0 && i == 0) {
                vectorIcons += `<i class='fas fa-tint umidade active'><sub>${counterUmi[i]}</sub></i>`
            }
            if (counterUmi[i] > 0 && i == 1) {
                vectorIcons += `<i class='fas fa-tint umidade inactive'><sub>${counterUmi[i]}</sub></i>`
            }
            if (counterUmi[i] > 0 && i == 2) {
                vectorIcons += `<i class='fas fa-tint umidade attention'><sub>${counterUmi[i]}</sub></i>`
            }
        }
    }

    orderIcons();

    return vectorIcons

}


let salasObject;

listarSalas = () => {

    let containerSalas = document.querySelector('.rooms-container');

    fetch(`/salas/${user.idEmpresa != undefined ? user.idEmpresa : user.fkEmpresa}`, {
        method: 'GET'
    }).then((response) => {
        response.json().then(data => {

            if (data.length != 0) {
                document.querySelector('.no-rooms').classList.add('invisible');
                data.forEach((sala, index, array) => {
                    containerSalas.innerHTML += `
                <div id=${sala.idSala} class="boxes-item">
                    <h3>${sala.nomeSala}</h3>
                    <div class="box-text">
                        <p>${sala.descricao}</p>
                        <h4>Sensores: 
                        ${listSensors(sala)}
                        </h4>
                        <h4>Status: 
                        <i id="loading-${sala.idSala}"class="fas fa-sync-alt fa-spin cyan-blue"></i>
                        <i id='status-${sala.idSala}' class='fas fa-circle ideal loading'></i> 
                        </h4>
                    </div>
                </div>`;

                });

                salasObject = data;
                console.log(salasObject);
                salasObject.forEach((sala) => {
                    document.getElementById(sala.idSala).addEventListener('click', () => {
                        sessionStorage.setItem('sala', JSON.stringify(sala));

                        window.location.href = 'sala.html';
                    })
                });
            } else {
                document.querySelector('.no-rooms').classList.remove('invisible');

            }



        })
    });


}





listarSalas();



let verificar = (tipoLeitura, valorLeitura) => {
    if (tipoLeitura == 'temperatura') {
        if (valorLeitura >= 20 && valorLeitura <= 24) {
            return 'green';
        } else {
            return 'red';
        }
    } else if (tipoLeitura == 'umidade') {
        if (valorLeitura >= 40 && valorLeitura <= 60) {
            return 'green';
        } else {
            return 'red';
        }
    } else {
        if (valorLeitura >= 500 && valorLeitura <= 1000) {
            return 'green';
        } else {
            return 'false';
        }
    }
}


inserirDados = () => {
    if (salasObject != null && salasObject != undefined) {
        fetch(`http://localhost:9001/api/sendData/${JSON.stringify(salasObject)}`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data);

                    salasObject.forEach(sala => {
                        fetch(`/leituras/ultimaPorSala/${sala.idSala}`).then(response => {
                            if (response.ok) {
                                response.json().then(data => {
                                    console.log(data);
                                    if (data.length != 0) {
                                        console.log('valor: ' + data[data.length - 1].valorLeitura + '\n' + 'tipo: ' + data[0].tipoLeitura + '\n' + 'status: ' + verificar(data[data.length - 1].tipoLeitura, data[data.length - 1].valorLeitura));

                                        document.getElementById(`loading-${sala.idSala}`).classList.add('loaded');
                                        document.getElementById(`status-${sala.idSala}`).classList.remove('loading');
                                        document.getElementById(`status-${sala.idSala}`).style.color = verificar(data[data.length - 1].tipoLeitura, data[data.length - 1].valorLeitura);
                                    } else {
                                        document.getElementById(`loading-${sala.idSala}`).classList.add('loaded');
                                        document.getElementById(`status-${sala.idSala}`).classList.remove('loading');
                                        document.getElementById(`status-${sala.idSala}`).style.color = 'red';
                                    }
                                })
                            }
                        })
                    })

                })
            }
        });
    }
}

if (user.idEmpresa != undefined) {
    document.getElementById('cadastro_responsavel').classList.remove('invisible')
} else {
    document.getElementById('cadastro_responsavel').classList.add('invisible')
}

setInterval(() => {
    inserirDados();
}, 5000);