export let createCustomIcon = () =>
  L.Icon.extend({
    options: {
      iconSize: [32, 32],
      //shadowSize: [32, 32],
      iconAnchor: [16, 32],
      //shadowAnchor: [4, 40],
      popupAnchor: [1, -32],
    },
  });

export let createShipMarker = ship => {
  let svgShip = createSvgShip();

  /*
    For data URI SVG support in Firefox & IE it's necessary to URI encode the string
    & replace the '#' character with '%23'. `encodeURI()` won't do this which is
    why `replace()` must be used on the string afterwards.
  */

  let url = encodeURI('data:image/svg+xml,' + svgShip).replace('#', '%23');

  let CustomIcon = createCustomIcon();

  let shipIcon = new CustomIcon({ iconUrl: url });

  let marker = L.marker([ship.position.lat, ship.position.lng], {
    icon: shipIcon,
    title: ship.name,
    alt: ship.name,
  });
  marker.shipImo = ship.imo;
  marker.isShipMarker = true;
  return marker;
};

export let createSvgShip = ({
  mark = 'white',
  ship = 'black',
} = {}) => `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
s<path fill="${mark}" d="M6.074 12.889c0-5.963 4.852-10.815 10.815-10.815s10.815 4.851 10.815 10.815c0 2.312-1.438 5.798-3.886 9.497-.427-.263-1.012-.546-1.567-.546-1.038 0-1.143 1.024-2.19 1.024s-2.086-1.023-3.129-1.023l-.021-.002c-1.043 0-2.099 1.024-3.147 1.024s-1.084-1.024-2.122-1.024c-.567 0-1.156.295-1.576.563-2.546-3.771-3.992-7.194-3.992-9.514zM16.889 0C9.782 0 4 5.782 4 12.889c0 4.318 3.74 9.903 5.348 12.103.524.718 5.188 7.008 7.541 7.008 3.293 0 12.889-12.284 12.889-19.111C29.778 5.782 23.996 0 16.889 0z"></path>
<path fill="${ship}" d="M17.486 11.565c2.31.275 5.998 2.627 5.998 4.445l-1.49 4.796c-.687.22-.898.965-1.794.965-.989 0-2.062-.909-3.047-1.015l.333-9.191zm-6.988 4.445c0-1.818 3.689-4.17 5.998-4.445l.333 9.191c-.985.107-2.058 1.016-3.047 1.016-.896 0-1.106-.745-1.794-.966l-1.49-4.796zm1.929-6.014h9.066l-.025-.053c-.441-.936-.764-.917-3.138-.917h-2.741c-2.374 0-2.696-.019-3.138.917l-.025.053zm5.891-2.497h5.969l-.53 1.709h-1.291l.93 5.524c-.695-.948-1.887-2.263-3.134-2.981 1.5-.064 1.791-.293 1.515-1.089h-9.632c-.267.768-.005 1.008 1.363 1.082-1.415.806-2.594 2.318-3.115 3.425l1.091-5.961h-1.291l-.53-1.709h5.969l.904-3.454h.879l.905 3.454z"></path>
</svg>`;

export let addShipMarkerToMap = ({ map, marker, ship }) => {
  marker
    .addTo(map)
    .bindPopup(
      `<div class="leaflet-popup-content-detail"><pre>${JSON.stringify(
        ship,
        null,
        1
      )}</pre></div>`
    );
};

export let addShipsToMap = ({ ships, map }) => {
  ships &&
    ships.length &&
    ships.forEach(ship => {
      let marker = createShipMarker(ship);
      addShipMarkerToMap({ marker, ship, map });
    });
};
