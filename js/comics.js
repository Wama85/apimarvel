export function BuscaComics(hero, ts, publickey, md5, index) {
  if (hero.comics.available > 0) {
    let urlHeroFeatures = ""; // Variable para almacenar la URL de las características del héroe
    
    // Buscar la URL de las características del héroe
    for (const url of hero.urls) {
      if (url.type === "detail") {
        urlHeroFeatures = url.url;
        break;
      }
    }
    
    fetch(
      `https://gateway.marvel.com:443/v1/public/characters/${hero.id}/comics?ts=${ts}&apikey=${publickey}&hash=${md5}`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error('La red no responde, intente más tarde');
        }
        return res.json();
      })
      .then((json) => {
        const comicsList = document.getElementById(`comicsList-${index}`);
        for (const comic of json.data.results) {
          comicsList.innerHTML += `<li><a href="${urlHeroFeatures}" target="_blank">${comic.title}</a></li>`;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
