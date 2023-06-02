import {BuscaComics } from './comics.js'
import {BuscaSeries} from './series.js'
import {BuscaEvents} from './eventos.js'
import {publickey,ts,md5} from './conectar.js'


const nombre = document.querySelector('#nombre');
nombre.addEventListener('change', updateValue);

function updateValue(e) {
  marvel.render();
}
const marvel = {
  render: () => {
       
    const searchQuery = nombre.value.trim();
    if (searchQuery === '') {
      return;
    }
    const urlAPI = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&ts=${ts}&apikey=${publickey}&hash=${md5}`;

    const container = document.querySelector('#marvel-row');
    let contentHTML = '';

    fetch(urlAPI)
      .then(res => {
        if (!res.ok) {
          throw new Error('La red no responde, intente más tarde');
        }
        return res.json();
      })
      .then((json) => {
        for (const [index, hero] of json.data.results.entries()) {
          //let urlHero = hero.urls[0].url;
          let imageUrl = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
          
          const btnId = `myBtn-${index}`;
          const modalId = `myModal-${index}`;
          const modalTitleId = `modalTitle-${index}`; // Nuevo ID del modal del título
          const modalId2 = `myModal2-${index}`; // Nuevo ID del segundo modal
         //const hasMovies = hero.series.available > 0;
          contentHTML += `
            <div class="col-md-4">
              <a href="#" id="${btnId}">
                <img src="${imageUrl}" alt="${hero.name}" class="img-thumbnail">
              </a>
              <a href="#" id="modalContent-${index}">
                <p class="titulo" id="${modalTitleId}">${hero.name}</p>
                
              </a>
              
              <div id="${modalId}" class="modal">
                <div class="modal-content">
                  <span class="close">&times;</span>
                  <p><img src="${imageUrl}" alt="${hero.name}" class="img-thumbnail"></p>
                </div>
              </div>
              <div id="${modalId2}" class="modal">
              <div class="modal-content">

                <span class="close">&times;</span>
                <p><h3>${hero.name}</h3></p>
                <div id="flex">
                <div id="flex-izquierda">
                <p><img src="${imageUrl}" alt="${hero.name}"  width="300px"></p>
                </div>
                <div id="flex-derecha">
                <h3>DESCRIPCIÓN</h3>
                <p id="descripcion">${hero.description}</p>
                <p>${hero.modified} - Fecha de modificación</p>
                <p><a href="${hero.resourceURI}?ts=${ts}&apikey=${publickey}&hash=${md5}">${hero.resourceURI}</a></p>
                <p>Total Events: ${hero.events.available}</p>
                <p>Total Series: ${hero.series.available}</p>
                <p>Total Comics: ${hero.comics.available}</p>
                </div>
                </div>

                <p>${hero.events.available > 0 ? 'Eventos:' : 'No tiene Eventos'}</p>
                ${hero.events.available > 0  ? '<ul id="eventList-' + index + '"></ul>' : ''}
                <p>${hero.series.available > 0 ? 'Series:' : ''}</p>
                ${hero.series.available > 0 ? '<ul id="seriesList-' + index + '"></ul>' : ''}
                <p>${hero.comics.available > 0 ? 'Cómics:' : ''}</p>
                ${hero.comics.available > 0 ? '<ul id="comicsList-' + index + '"></ul>' : ''}
              </div>
            </div>
          </div>`;
        }
        container.innerHTML = contentHTML;

        // Asignar eventos de clic a los botones y modales
        for (const [index, hero] of json.data.results.entries()) {
          const btnId = `myBtn-${index}`;
          const modalId = `myModal-${index}`;
          const modalTitleId = `modalTitle-${index}`; // Nuevo ID para el título
          const modalId2 = `myModal2-${index}`; // Nuevo ID para el segundo modal
          const btn = document.getElementById(btnId);
          const modal = document.getElementById(modalId);
          const modal2 = document.getElementById(modalId2);
          const modalContent = document.getElementById(`modalContent-${index}`); // Nuevo modal para el contenido del héroe

          btn.onclick = function () {
            modal.style.display = "block";
          };

          modalContent.onclick = function () { // Evento de clic para mostrar el modal del contenido del héroe
            modal2.style.display = "block";
          };

          // Agregar eventos de clic para cerrar los modales
          const closeButtons = modal.getElementsByClassName("close");
          for (const closeButton of closeButtons) {
            closeButton.onclick = function () {
              modal.style.display = "none";
            };
          }

          const closeButtons2 = modal2.getElementsByClassName("close");
          for (const closeButton of closeButtons2) {
            closeButton.onclick = function () {
              modal2.style.display = "none";
            };
          }

        //acá vamos a filtrar las series que tiene el heroe
          
        BuscaSeries(hero, ts, publickey, md5, index);

         // Realizamos el llamado a las características del héroe

         BuscaEvents(hero,ts,publickey,md5,index);
          //en esta parte filtraremos los comics que tiene el heroe
         
        BuscaComics(hero, ts, publickey, md5, index);
          //Termina el filtro de comics
         

        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
};

window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};
