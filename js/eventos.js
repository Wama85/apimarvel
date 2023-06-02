export function BuscaEvents(hero,ts,publickey,md5,index)
{
if (hero.events.available > 0) {
    fetch(
      `https://gateway.marvel.com:443/v1/public/characters/${hero.id}/events?ts=${ts}&apikey=${publickey}&hash=${md5}`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error('La red no responde, intente más tarde');
        }
        return res.json();
      })
      .then((json) => {
        const eventList = document.getElementById(`eventList-${index}`);
        for (const event of json.data.results) {
          eventList.innerHTML += `<li>${event.title}</li>`;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }}