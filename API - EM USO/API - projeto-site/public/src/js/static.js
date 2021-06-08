let sala = sessionStorage.getItem('sala');
sala = JSON.parse(sala);
document.title = sala.nomeSala;

console.log(sala);

let qtdTemp = 0;
let qtdHumi = 0;
let qtdLumi = 0;



for (let i = 0; i < sala.sensores.length; i++) {

    if (sala.sensores[i].statusSensor == 'ativo' && sala.sensores[i].tipoLeitura == 'temperatura') {
        qtdTemp++;
    }


    if (sala.sensores[i].statusSensor == 'ativo' && sala.sensores[i].tipoLeitura == 'umidade') {
        qtdHumi++;
    }


    if (sala.sensores[i].statusSensor == 'ativo' && sala.sensores[i].tipoLeitura == 'luminosidade') {
        qtdLumi++;
    }
}



console.log(qtdTemp);
console.log(qtdHumi);
console.log(qtdLumi);








let contextLuminosity = document.querySelector('#chartLuminosity').getContext('2d');

let config = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Lux',
            data: [1200, 500, 750, 984, 1000, 475, 1600, 800],
            backgroundColor: [],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            position: "top",
            align: "start"
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};





let contextTemperature = document.querySelector('#chartTemperature').getContext('2d');



let configTemp = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Cº',
            data: [],
            backgroundColor: [],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            position: "top",
            align: "start"
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};





let contextHumidity = document.querySelector('#chartHumidity').getContext('2d');



let configHumi = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '%',
            data: [],
            backgroundColor: [],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            position: "top",
            align: "start"
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

let chartTemperature;
let chartHumidity;
let chartLuminosity;


if (qtdTemp > 0) {


    chartTemperature = new Chart(contextTemperature, configTemp);

} else {
    document.getElementById('chartTemperature').classList.add('occult');
    document.getElementById('temp-block').classList.remove('occult');
}





if (qtdHumi > 0) {

    chartHumidity = new Chart(contextHumidity, configHumi);


} else {
    document.getElementById('chartHumidity').classList.add('occult');
    document.getElementById('humi-block').classList.remove('occult');
}





if (qtdLumi > 0) {

    chartLuminosity = new Chart(contextLuminosity, config);


} else {
    document.getElementById('chartLuminosity').classList.add('occult');
    document.getElementById('lumi-block').classList.remove('occult');
}


console.log(sala);
let salaArray = [sala];



inChart = (tipoLeitura, valorLeitura) => {
    let elemento;
    let bgColor;
    if (tipoLeitura == 'temperatura') {
        elemento = chartTemperature;
        if (valorLeitura < 16.0) {
            bgColor = '#FFFF25'
        } else if (valorLeitura < 20.0) {
            bgColor = '#FFBB33'
        } else if (valorLeitura <= 24.0) {
            bgColor = '#548235'
        } else if (valorLeitura <= 32.0) {
            bgColor = '#FF8800'
        } else {
            bgColor = '#d50606'
        }

    } else if (tipoLeitura == 'umidade') {
        elemento = chartHumidity;
        if (valorLeitura < 30) {
            // console.log('Extremamente Baixo');
            bgColor = '#FFFF25';
        } else if (valorLeitura < 40) {
            // console.log('Baixo')
            bgColor = '#FFBB33';
        } else if (valorLeitura <= 60) {
            // console.log('Ideal');
            bgColor = '#548235';
        } else if (valorLeitura <= 70) {
            // console.log('Alta');
            bgColor = '#FF8800';
        } else {
            // console.log('Extremamente Alta');
            bgColor = '#d50606';
        }

    } else {
        elemento = chartLuminosity;
        if (valorLeitura < 375) {
            // console.log('Extremamente Baixo');
            bgColor = '#FFFF25'
        } else if (valorLeitura < 500) {
            // console.log('Baixo');
            bgColor = '#FFBB33'
        } else if (valorLeitura <= 1000) {
            // console.log('Ideal')
            bgColor = '#548235'
        } else if (valorLeitura <= 1125) {
            // console.log('Alta')
            bgColor = '#FF8800'
        } else {
            // console.log('Extremamente Alta')
            bgColor = '#d50606'
        }
    }



    if (elemento.data.labels.length < 8) {
        elemento.data.labels.push(valorLeitura);
        elemento.data.datasets[0].data.push(valorLeitura);
        elemento.data.datasets[0].backgroundColor.push(bgColor);
        elemento.update();

    } else {
        elemento.data.labels.shift();
        elemento.data.datasets[0].data.shift();
        elemento.data.datasets[0].backgroundColor.shift();
        elemento.data.labels.push(valorLeitura);
        elemento.data.datasets[0].data.push(valorLeitura);
        elemento.data.datasets[0].backgroundColor.push(bgColor);
        elemento.update();
    }


}


setInterval(() => {

    fetch(`http://localhost:9001/api/sendData/${JSON.stringify(salaArray)}`).then(response => {
        response.json().then(data => {
            console.log(data);
            fetch(`/leituras/ultimasPorSala/${sala.idSala}/${qtdHumi + qtdLumi + qtdTemp}`).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        data.forEach(leitura => {
                            inChart(leitura.tipoLeitura, leitura.valorLeitura);
                        });
                    })
                }
            })
        })
    });


}, 2000);



