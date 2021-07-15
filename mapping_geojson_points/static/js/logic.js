// Add console.log to check to see if our code is working.
console.log('working');

// Street style tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
// Add GeoJSON data.

// let sanFranAirport = 
// {"type":"FeatureCollection","features":[{
//     'type':'Feature',
//     'properties':{
//         'id':'3469',
//         'name':'San Francisco International Airport',
//         'city':'San Francisco',
//         'country':'United States',
//         'faa':'SFO',
//         'icao':'KSFO',
//         'alt':'13',
//         'tz-offset':'-8',
//         'dst':'A',
//         'tz':'America/Los_Angeles'},
//         "geometry":{
//             'type':'Point',
//             'coordinates':[-122.375,37.61899948120117]}}
    
// ]};

// Grabbing our GeoJSON data.

// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: (feature, latlng) => {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup('<h2>' + feature.properties.city + '</h2>');
//     }
// }).addTo(map);

// L.geoJson(sanFranAirport, {
//     onEachFeature: (feature,layer) => {
//         console.log(layer);
//         layer.bindPopup();
//     }
// }).addTo(map);

//Accessing the airport GeoJSON URL
let airportData = 'https://raw.githubusercontent.com/dannyvchu/mapping_earthquakes/mapping_geojson_points/majorAirports.json';
// Grabbing our GeoJSON data.
d3.json(airportData).then(data => {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        onEachFeature: (feature,layer) => {
            console.log(feature);
            layer.bindPopup('<h2>' + feature.properties.city + '</h2>');
        }
    }).addTo(map);
});
