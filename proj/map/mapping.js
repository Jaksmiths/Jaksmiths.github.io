// import {Deck} from '@deck.gl/core';
// import {ScatterplotLayer} from '@deck.gl/layers';

const sourceData = 'https://raw.githubusercontent.com/Jaksmiths/Jaksmiths.github.io/master/proj/map/Microplastic_Data.json';

showscatter = true;
showheat = true;

document.getElementById("Scatterplot").onchange = function(){
  showscatter = showscatter ? false : true;
};
document.getElementById("Heatmap").onchange = function(){
  showheat = showheat ? false : true;
};

const scatterplot = new deck.ScatterplotLayer({
    id: 'scatter',
    data: sourceData,
    visible: showscatter,
    opacity: 1,
    filled: true,
    radiusMinPixels: 3,
    radiusMaxPixels: 5,
    getPosition: d => [d.Long, d.Lat],
    getFillColor: (d) => {
      const val = d.PiecesPerKM2;
      if(val == 0) {
        return [15, 223, 5, 100];
      } else if(1000 > val && val >= 100) {
        return [255, 254, 0, 100];
      } else if(10000 > val && val >= 1000) {
        return [255, 108, 0, 100];
      } else if(50000 > val && val >= 10000) {
        return [255, 54, 0, 100];
      } else {
        return [164, 0, 255, 100];
      }
    },

    pickable: true,
    onHover: ({object, x, y}) => {
        const el = document.getElementById('tooltip');
        if (object) {
          const Pieces = object.PiecesPerKM2;
          const Date = object.Date;
          el.innerHTML = `${Date}<h1>Microplastic per KM^2 = ${Pieces}</h1>`
          el.style.fontSize = 14;
          el.style.display = 'block';
          el.style.opacity = 0.9;
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        } else {
          el.style.opacity = 0.0;
        }
    },
});

const heatmap = new deck.HeatmapLayer({
    id: 'heat',
    data: sourceData,
    visible: showheat,
    getPosition: d => [d.Long, d.Lat],
    getWeight: d => d.PiecesPerKM2,
    opacity: 0.6, 
    radiusPixels: 60,
});

const map = new deck.DeckGL({
    container: 'map',
    mapStyle: deck.carto.BASEMAP.DARK_MATTER,
    initialViewState: {
      longitude: -89.89,
      latitude: 25.68,
      zoom: 2
    },
    controller: true,
    layers: [ scatterplot, heatmap ]
});
