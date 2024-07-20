let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let dni = document.getElementById('dni');
let os = document.getElementById('os');
let email = document.getElementById('email');
let telefono = document.getElementById('telefono');
let medico = document.getElementById('medico');
let horario = document.getElementById('horario');
let enviar = document.getElementById('enviar');

const horarios = {
    'Dr Jorge Bocian -Cardiologia-': ['Lunes y viernes de 9 a 12', 'Martes y jueves de 9 a 15', 'viernes de 13 a 16'],
    'Dr Nazzetta Fernando -Cardiologia-': ['lunes de 10 a 17', 'Martes de 10 a 14', 'Jueves de 11 a 15'],
    'Dr Fernando Martinez -Traumatologia-': ['martes de 15 a 19', 'jueves de 11 a 17'],
    'Dr Albano Pablo -Traumatologia-': ['lunes de 10 a 15', 'Miercoles de 11 a 16'],
    'Dr Oliwa Jorge -Neurologia-': ['Lunes de 10 a 14', 'martes de 9 a 15', 'miercoles de 10 a 13', 'jueves de 9 a 14'],
    'Dr Alvarez Maria Sol -Neurologia-': ['Martes de 9 a 14', 'viernes de 9 a 15']
};

document.addEventListener('DOMContentLoaded', (event) => {
    loadFormData();
    let selectedMedico = medico.value;
    if (selectedMedico) {
        updateHorarios(selectedMedico);
        horario.value = localStorage.getItem('horario') || '';
    }
});

medico.addEventListener('change', (event) => {
    let selectedMedico = event.target.value;
    updateHorarios(selectedMedico);
});

function updateHorarios(medico) {
    horario.innerHTML = '';
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Seleccione franja horaria';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    horario.add(defaultOption);

    if (horarios[medico]) {
        horarios[medico].forEach(hora => {
            let option = document.createElement('option');
            option.text = hora;
            option.value = hora;
            horario.add(option);
        });
    }
}

function saveFormData() {
    localStorage.setItem('nombre', nombre.value);
    localStorage.setItem('apellido', apellido.value);
    localStorage.setItem('dni', dni.value);
    localStorage.setItem('os', os.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('telefono', telefono.value);
    localStorage.setItem('medico', medico.value);
    localStorage.setItem('horario', horario.value);
}

function loadFormData() {
    nombre.value = localStorage.getItem('nombre') || '';
    apellido.value = localStorage.getItem('apellido') || '';
    dni.value = localStorage.getItem('dni') || '';
    os.value = localStorage.getItem('os') || '';
    email.value = localStorage.getItem('email') || '';
    telefono.value = localStorage.getItem('telefono') || '';
    medico.value = localStorage.getItem('medico') || '';
}

function envio() {
    let valid = true;
    let fields = [medico, horario, nombre, apellido, dni, os, email, telefono];

    fields.forEach(field => {
        if (!field.value || field.value === 'Seleccione Médico' || field.value === 'Seleccione franja horaria') {
            field.classList.add('invalid');
            valid = false;
        } else {
            field.classList.remove('invalid');
        }
    });

    if (!valid) {
        alert('Por favor, complete todos los campos antes de enviar el mensaje.');
        saveFormData();
        return;
    }

    let mensaje = `https://api.whatsapp.com/send?phone=+5492944682681&text=Quiero%20un%20turno%20con%20el%20%20Medico%20${medico.value}+%0AEn%20el%20horario%20+${horario.value}%0A+Mis%20datos%20personales%20son:%0A+Nombre:%20${nombre.value}%0A+Apellido:%20+${apellido.value}%0A+DNI:%20+${dni.value}%0A+Obra%20Social:%20+${os.value}%0A+Email:%20+${email.value}%0A+Telefono:%20+${telefono.value}`;
    enviar.href = mensaje;
    localStorage.clear(); // Clear the data after successful submission
}
