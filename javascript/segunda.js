// Para el menú en responsive
document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menu-icon');
  const navList = document.getElementById('nav-list');

  menuIcon.addEventListener('click', function () {
    navList.classList.toggle('show');
  });

  // Lee los datos almacenados en sessionStorage
  const responseAiText = sessionStorage.getItem('responseAiText');
  const responseAiHash = sessionStorage.getItem('responseAiHash');
  const nombre = sessionStorage.getItem('nombre');

  // Asigna los datos a las áreas de texto
  document.getElementById('storytelling').value = responseAiText || '';
  document.getElementById('copy').value = responseAiHash || '';

  // Actualiza el contenido del título con el nombre de la campaña
  document.getElementById('nombreCampañaPlaceholder').innerText = nombre;

  // Agrega un evento al botón "Guardar"
  document.getElementById('submitBtn2').addEventListener('click', function () {
    // Obtén los valores actuales de las áreas de texto
    const nuevoStorytelling = document.getElementById('storytelling').value;
    const nuevoCopy = document.getElementById('copy').value;

    // Realiza la solicitud PATCH para actualizar en la base de datos
    fetch('http://localhost:3000/api/storytelling:id', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nuevoStorytelling: nuevoStorytelling,
        nuevoCopy: nuevoCopy,
        // Otros datos que necesites enviar para la actualización
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Maneja la respuesta según tus necesidades
        console.log('Respuesta de la actualización:', data);
        // Puedes mostrar un mensaje de éxito o redirigir a otra página, etc.
      })
      .catch((error) => {
        console.error('Error en la solicitud de actualización:', error);
        // Puedes mostrar un mensaje de error o manejar la situación de otra manera
      });
  });
});