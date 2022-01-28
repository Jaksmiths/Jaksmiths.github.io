// import {Deck} from '@deck.gl/core';
// import {ScatterplotLayer} from '@deck.gl/layers';

const sourceData = 'https://raw.githubusercontent.com/Jaksmiths/Jaksmiths.github.io/master/proj/map/Microplastic_Data.json';

const scatterplot = new deck.ScatterplotLayer({
    id: 'scatter',
    data: sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [d.Long, d.Lat],
    getFillColor: d => d.PiecesPerKM2 > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],

    pickable: true,
    onHover: ({object, x, y}) => {
        const el = document.getElementById('tooltip');
        if (object) {
          const Pieces = object.PiecesPerKM2;
          el.innerHTML = `<h1># of Debris ${Pieces}</h1>`
          el.style.display = 'block';
          el.style.opacity = 0.9;
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        } else {
          el.style.opacity = 0.0;
        }
    },
});

const map = new deck.DeckGL({
    container: 'map',
    mapStyle: deck.carto.BASEMAP.VOYAGER,
    initialViewState: {
      longitude: -89.89,
      latitude: 25.68,
      zoom: 2
    },
    controller: true,
    layers: [ scatterplot ]
});
