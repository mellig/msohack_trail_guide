/**
Uses Leaflet to create an embedded slippy map attached to a #map element.
*/

// Leaflet documentation: http://leafletjs.com/reference.html
// maps.stamen.com library used for basemap
// leaflet.ajax used to load external geojson file

// Create Leafley map object, set view to center over Missoula

var trailMap = L.map('map', {
  center: [46.84,-114.03],
  zoom: 10,
  minZoom: 9,
  maxZoom: 14
});

// Add basemap terrain image, from http://maps.stamen.com/
var basemap = new L.StamenTileLayer("terrain");
trailMap.addLayer(basemap);

//array to store layers for each feature type
var trailAreas = [];


// Trailhead marker style
// TODO: Figure out how to make this something that can be dynamically changed based on data properties
// TODO: Figure out how to adjust these based on the overall map zoom level (e.g., making trailhead markers bigger at higher zooms)
var trailheadMarkerStyle = {
    radius: 4,
    fillColor: "#e6550d",
    color: "#fff",
    weight: 1.2,
    opacity: 1,
    fillOpacity: 1
};

// Load trail network data
var trails = new L.GeoJSON.AJAX("data/msa-trails-all-uncleaned.geojson", {
    style: function (feature) {
      return { color: '#e6550d',
               weight: 1.0,
               opacity: 0.9}
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

// Set event listeners
trails.on('click', zoom);

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
  // Zoom to M network
  //var latlng = new L.LatLng(46.862, -113.980);

  // Zoom to point clicked
  var latlng = e.latlng;

  trailMap.setView(latlng, 13);
  console.log("Zoomed!");

  //TODO: Figure out how to expand the clickable are so you don't have to hit the trail feature directly to zoom into the area
}


/**
Desired behavior through here:
Have trail system organized by region/park (display colors based on that?)
On click, zoom to area of particular trail system and highlight (make other trails less opaque)
 */