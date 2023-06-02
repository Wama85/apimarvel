export function BuscaSeries(hero, ts, publickey, md5, index)
{
if (hero.series.available > 0) {
    fetch(
      `https://gateway.marvel.com:443/v1/public/characters/${hero.id}/series?ts=${ts}&apikey=${publickey}&hash=${md5}`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error('La red no responde, intente más tarde');
        }
        return res.json();
      })
      .then((json) => {
        const seriesList = document.getElementById(`seriesList-${index}`);
        for (const series of json.data.results) {
          seriesList.innerHTML += `<li>${series.title}</li>`;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }}