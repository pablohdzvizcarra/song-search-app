import './style.scss';
import { API } from './api.js'
import * as UI from './interfaz.js';

console.log(UI)

UI.formularioBuscar.addEventListener('submit', event => {
  event.preventDefault();

  // Obtener datos del formulario
  const artista = document.querySelector('#artista').value;
  const cancion = document.querySelector('#cancion').value;

  if (artista === '' || cancion === '') {
    // El usuario deja los campos vacios, show error
    UI.divMensajes.innerHTML = 'Error... todos los campos son obligatorios';

    setTimeout(() => {
      UI.divMensajes.innerHTML = '';
    }, 3000);
  } else {
    // El formulario esta completo realizar consulta a la API
    const api = new API(artista, cancion);
    api.consultarAPI()
      .then(data => {
        console.log(data)
        if (data.lyrics) {
          // La cancion existe
          const letra = data.lyrics;
          UI.divResultado.textContent = letra;
        } else {
          // La cancion no existe
          UI.divMensajes.innerHTML = 'La cancion no existe, prueba con otra busqueda';
          UI.divResultado.textContent = '';
          setTimeout(() => {
            UI.divMensajes.innerHTML = '';
            UI.formularioBuscar.reset();
          }, 3000);
        }
      })
  }
})