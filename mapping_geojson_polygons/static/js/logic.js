// Add console.log to check to see if our code is working.
console.log('working');

// Street style tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Dark style tile layer

// Then we add our 'graymap' tile layer to the map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
// Add GeoJSON data.

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = 'https://raw.githubusercontent.com/dannyvchu/mapping_earthquakes/mapping_geojson_linestrings/torontoRoutes.json';

// Create a style for the lines.
let myStyle = {
    color: 'yellow',
    weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(data => {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: (feature,layer) => {
            layer.bindPopup('<h3> Airline: ' + feature.properties.airline + '</h3> <hr><h3> Destination: ' + feature.properties.dst + '</h3>');
        }
    }).addTo(map);
});
