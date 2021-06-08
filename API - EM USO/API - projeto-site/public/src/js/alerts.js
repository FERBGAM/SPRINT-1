function generateAlert(context, type, text) {
    var alert = document.createElement('div');
    var textAlert = document.createElement('p');
    var closeAlert = document.createElement('div');
    var iconCloseAlert = document.createElement('i');
    var iconAlert = document.createElement('i');
    var span = document.createElement('span');
    alert.className = 'alert';
    alert.id = 'cadastroAlert';

    closeAlert.className = 'close-btn';

    iconCloseAlert.className = 'fas fa-times';

    textAlert.innerHTML = text;

    if (type == 'warning') {
        iconAlert.classList.add('fas', 'fa-exclamation-triangle');
        iconAlert.style.color = 'var(--darker-warning-color)';
        alert.style.backgroundColor = 'var(--warning-color)';
        alert.style.borderLeft = '10px solid var(--darker-warning-color)';
        closeAlert.style.backgroundColor = 'var(--darker-warning-color)';
        closeAlert.style.color = 'var(--warning-color)';
    } else if (type == 'danger') {
        iconAlert.classList.add('fas', 'fa-times-circle');
        iconAlert.style.color = 'var(--darker-danger-color)';
        alert.style.backgroundColor = 'var(--danger-color)';
        alert.style.borderLeft = '10px solid var(--darker-danger-color)';
        closeAlert.style.backgroundColor = 'var(--darker-danger-color)';
        closeAlert.style.color = 'var(--danger-color)';
    } else {
        iconAlert.classList.add('far', 'fa-check-circle');
    }

    alert.appendChild(span);
    alert.appendChild(iconAlert);
    alert.appendChild(textAlert);
    alert.appendChild(closeAlert);
    closeAlert.appendChild(iconCloseAlert);




    context.appendChild(alert);

    alert.classList.add('visible');


    closeAlertMsg = (element) => {
        if (element.classList.contains('visible')) {
            element.classList.remove('visible');
        }
    }

    closeAlert.addEventListener('click', () => {
        closeAlertMsg(alert);
    })




    timeout = (ms) => {
        return new Promise(res => setTimeout(res, ms))
    }

    deleteAlert = async (alertElement) => {
        await timeout(1000);
        alertElement.parentNode.removeChild(alertElement);
    }

    setTimeout(() => {
        alert.classList.remove('visible');
        deleteAlert(alert);
    }, 3000);

}


