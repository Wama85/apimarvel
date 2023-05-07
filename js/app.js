
const publickey = "b37c943f1a1852384cfc67e4c73685ae";
const privatekey = "692a2c9b630e218caa9af41a9251db7a6cea0b80";

const nombre = document.querySelector('#nombre');
//const log = document.getElementById('log');

nombre.addEventListener('change', updateValue);

function updateValue(e) {
  //log.textContent = e.target.value;
  marvel.render();
}

const marvel = {
  render: () => {
    const md5 = "055cf625544ef02dcabeb64d650949e7";
    const ts = 1;
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
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((json) => {
        for (const hero of json.data.results) {
          let urlHero = hero.urls[0].url;
          let imageUrl = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
          contentHTML += `
          <div class="col-md-4">
          
            <img src="${imageUrl}" alt="${hero.name}" class="img-thumbnail" data-toggle="modal" data-target="#hero-modal-${hero.id}">
          
          <a href="${urlHero}" target="_blank">
          <h3 class="title">${hero.name}</h3>
          </a>
          <!-- Modal para mostrar la imagen agrandada -->
          <div class="modal fade" id="hero-modal-${hero.id}" tabindex="-1" role="dialog" aria-labelledby="hero-modal-${hero.id}-label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <img src="${imageUrl}" alt="${hero.name}" class="img-fluid">
                </div>
              </div>
            </div>
          </div>
        </div>`;
        }
        container.innerHTML = contentHTML;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
};


