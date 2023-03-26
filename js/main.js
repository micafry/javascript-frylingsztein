
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

    const cliente = function (nombre, apellido, telefono, email, dia, hora) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.telefono = telefono,
            this.email = email,
            this.dia = dia,
            this.hora=hora
    }

    const cliente1 = new cliente(nombre, apellido, telefono, email, dia,hora);
    localStorage.setItem('datos del cliente', JSON.stringify(cliente1))
    const datosCliente = localStorage.getItem('datos del cliente')
    const datos = JSON.parse(datosCliente);

    const confirmacion = swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })

    confirmacion.fire({
        title: '¿Desea confirmar los datos ingresados?',
        text: `Nombre: ${nombre} ${apellido},  Teléfono: ${telefono}, Email: ${email} Turno: ${dia} ${hora}`, 
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    })
    .then((resultado) => {
        if (resultado.value) {
            if (reservarHora(dia, hora, nombre, apellido, telefono, email)) {
                mensaje.textContent = `Gracias ${nombre} ${apellido}! Su turno ha sido reservado para el día ${dia} a las ${hora}.`;
                swal.fire({
                    title: 'Turno reservado con éxito',
                    icon: 'success'
                })
                nombreInput.value = '';
                apellidoInput.value = '';
                emailInput.value = '';
                telefonoInput.value = '';
                diaInput.value = '';
                horaInput.value = '';
            } else {
                mensaje.textContent = `Lo sentimos, el turno del ${dia} a las ${hora} ya está reservado. Por favor, seleccione otra fecha/hora.`;
                swal.fire({
                    title: 'Turno ocupado',
                    text: 'Por favor, seleccione otro turno.',
                    icon: 'error'
                })
            }
        }
    })
});



