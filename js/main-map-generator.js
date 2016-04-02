/**
Uses Leaflet.js to create an embedded slippy map attached to a #map element.
*/

// Leaflet documentation: http://leafletjs.com/reference.html
// maps.stamen.com library used for basemap
// leaflet.ajax used to load external geojson file

// GLOBAL VARIABLES

// TODO: Figure out how to make this something that can be dynamically changed based on data properties
// TODO: Figure out how to adjust these based on the overall map zoom level (e.g., making trailhead markers bigger at higher zooms)
var trailheadMarkerStyle = {
    radius: 2,
    fillColor: "#333",
    color: "#fff",
    weight: 1.2,
    opacity: 1,
    fillOpacity: .8
};

// Array to store layers for each feature type
// TODO: Implement the functionality that uses this
var trailAreas = [];

// CREATE MAP / BASEMAP

// Create Leafley map object, set view to center over Missoula, MT
var trailMap = L.map('map', {
  center: [46.84,-114.03],
  zoom: 10,
  minZoom: 9,
  maxZoom: 14
});

// Add basemap terrain image, from http://maps.stamen.com/
var basemap = new L.StamenTileLayer("terrain");
trailMap.addLayer(basemap);

// ADD TRAIL & TRAILHEAD DATA

// Var for trail color area, acting on trail network code
// TODO: Separate this out into its own file
var trailColorKey = {
  'Bitterroot Bike Trail': '#5e4fa2',
  'Bitterroot Branch Trail': '#5e4fa2',
  'Blue Mountain': '#ff7f00',
  'Mt Jumbo': '#6a3d9a',
  'North Hills': '#ff7f00',
  'Clark Fork Riverfront': '#a50026',
  'Mt Sentinel': '#5e4fa2',
  'South Hills': '#5e4fa2',
  'Tower Street': '#a50026',
  'Pattee Canyon': '#ff7f00',
  'Frenchtown Area': '#a50026',
  'Rattlesnake': '#a50026',
  'Lolo National Forest': '#a50026',
  'Milwaukee Trail': '#5e4fa2',
  'Mullan Road': '#56036d',
  'East Missoula': '#c51b7d',
  'Grant Creek Trail': '#ff7f00'
}
console.log(trailColorKey);

// Load trail network data
var trails = new L.GeoJSON.AJAX("data/msa-trails-cleaned-2nd-round.geojson", {
    style: function (feature) {
      styleObj = {weight: 1.5,
                  opacity: 0.9}
      var network_name = feature.properties.trail_netw
      if (trailColorKey.hasOwnProperty(network_name)) {
        styleObj.color = trailColorKey[network_name];
        // console.log('Match:', network_name);
      } else {
        console.log('No match:', feature.properties.trail_netw);
          styleObj.color = '#ff7f00';
      }
      return styleObj;
  },
  onEachFeature: onEachFeature
});

// Load trailheads data
var trailheads = new L.GeoJSON.AJAX("data/msa-trailheads.geojson", {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, trailheadMarkerStyle);
    }
  });

// Add data layers to map
trails.addTo(trailMap);
trailheads.addTo(trailMap);

// SET EVENT LISTENERS

// For zoom in effect on clicking a trail network
trails.on('click', zoom);

// HELPER FUNCTIONS

// Sorts features into groups by park name
function onEachFeature(feature, layer) {
  // TODO: Set this up to sort features into layer groups by trail area, making area-based manipulations possible
  // Reference: http://stackoverflow.com/questions/33478202/leaflet-how-to-toggle-geojson-feature-properties-from-a-single-collection

  // trailArea = feature.properties.park_name;
  // // Initialize category array if not set
  // if (!trailAreas.indexOf(trailArea) >= 0){
  //   trailAreas.push(trailArea);
  // }
}

function zoom(e) {
  // Former functionality, zooming to M trail network
  //var latlng = new L.LatLng(46.862, -113.980);

  // Zoom to point clicked
  var latlng = e.latlng;

  trailMap.setView(latlng, 13);
  console.log("Zoomed!");

  //TODO: Figure out how to expand the clickable are so you don't have to hit the trail feature directly to zoom into the area
}