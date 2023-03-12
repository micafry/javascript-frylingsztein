const horasDisponibles = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const turnosOcupados = [];

function buscarTurnoPorHora(hora) {
    return turnosOcupados.find(turno => turno.hora === hora);
}

function filtrarHorasDisponibles() {
    return horasDisponibles.filter(hora => !buscarTurnoPorHora(hora));
}

function reservarHora(dia, hora, nombre, apellido, telefono, email) {
    if (filtrarHorasDisponibles().includes(hora)) {
        turnosOcupados.push({
            dia,
            hora,
            nombre,
            apellido,
            telefono,
            email
        });
        return true;
    } else {
        return false;
    }
}


const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const telefonoInput = document.getElementById('telefono');
const diaInput = document.getElementById('dia');
const horaInput = document.getElementById('hora');
const emailInput = document.getElementById('email');
const mensaje = document.getElementById('mensaje');


formulario.addEventListener('submit', (sacarTurno) => {
    sacarTurno.preventDefault();

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const telefono = telefonoInput.value;
    const email = emailInput.value;
    const dia = diaInput.value;
    const hora = horaInput.value;

    const cliente = function (nombre, apellido,telefono,email){
        this.nombre=nombre,
        this.apellido=apellido,
        this.telefono=telefono,
        this.email=email
    }

const cliente1= new cliente(nombre, apellido, telefono, email);
localStorage.setItem('datos del cliente', JSON.stringify(cliente1))



    if (reservarHora(dia, hora, nombre, apellido, telefono, email)) {
        mensaje.innerText = `Gracias ${nombre} ${apellido}! Su turno ha sido reservado para el día ${dia} a las ${hora}.`;
        nombreInput.value = '';
        apellidoInput.value = '';
        emailInput.value = '';
        telefonoInput.value = '';
        diaInput.value = '';
        horaInput.value = '';
    } else {
        mensaje.innerText = `Lo sentimos, el turno del ${dia} a las ${hora} ya está reservado. Por favor, seleccione otra fecha/hora.`;
}});

