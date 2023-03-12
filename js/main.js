// Definir horas disponibles y ocupadas
const horasDisponibles = ['9:00am', '10:00am', '11:00am', '1:00pm', '2:00pm', '3:00pm'];
const citasAgendadas = [];

// Función para buscar una cita agendada por hora
function buscarCitaPorHora(hora) {
  return citasAgendadas.find(cita => cita.hora === hora);
}

// Función para filtrar las horas disponibles
function filtrarHorasDisponibles() {
  return horasDisponibles.filter(hora => !buscarCitaPorHora(hora));
}

// Función para reservar una hora
function reservarHora(hora, nombre, apellido, telefono) {
  if (filtrarHorasDisponibles().includes(hora)) {
    citasAgendadas.push({
      hora,
      nombre,
      apellido,
      telefono
    });
    return true;
  } else {
    return false;
  }
}

// Obtener los elementos del formulario
const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const telefonoInput = document.getElementById('telefono');
const horaInput = document.getElementById('hora');
const mensaje = document.getElementById('mensaje');

// Manejar el envío del formulario
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const nombre = nombreInput.value;
  const apellido = apellidoInput.value;
  const telefono = telefonoInput.value;
  const hora = horaInput.value;

  if (reservarHora(hora, nombre, apellido, telefono)) {
    mensaje.textContent = `Gracias ${nombre} ${apellido}! Su turno ha sido reservado para ${hora}.`;
    nombreInput.value = '';
    apellidoInput.value = '';
    telefonoInput.value = '';
    horaInput.value = '';
  } else {
    mensaje.textContent = `Lo siento, ${hora} ya está ocupada. Por favor, seleccione otra hora.`;
  }
});