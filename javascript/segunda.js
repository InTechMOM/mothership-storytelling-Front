
const historyId = obtenerHistoryIdDesdeURL();

let responseAI = '';
let responseAI2 = '';

// Para el menú en responsive
document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menu-icon');
  const navList = document.getElementById('nav-list');

  menuIcon.addEventListener('click', function () {
    navList.classList.toggle('show');
  });

  // configura los valores de los textarea
  document.querySelector('#storytelling').value = responseAI;

  document.querySelector('#copy').value = responseAI2;
});

document.getElementById('submitBtn2').addEventListener('click', function () {

  // obtiene los nuevos contenidos editados por el usuario en los textarea
  const editedStorytelling = document.querySelector('#storytelling').value;

  const editedCopy = document.querySelector('#copy').value;

  if (historyId) {
    // actualiza responseAI en el servidor
    fetch(`https://mothership-back.onrender.com/api/storytelling/${historyId}/openai-response`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responseAI: editedStorytelling }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Respuesta de OpenAI actualizada en la base de datos:', data);
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });

    // actualiza responseAI2 en el servidor
    fetch(`https://mothership-back.onrender.com/api/storytelling/miID123/openai-response2`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responseAI2: editedCopy }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Respuesta de OpenAI2 actualizada en la base de datos:', data);
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  } else {
    console.error('No se encontró un historyId válido en la URL');
  }
});

// Para obtener el historyId desde la URL
function obtenerHistoryIdDesdeURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('historyId');
}