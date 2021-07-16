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
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    'Street': streets,
    'Satellite Streets': satelliteStreets
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// Define object that contains overlays
let overlays = {
    Earthquakes: earthquakes
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);
// Add GeoJSON data.

// Accessing the Toronto neighborhoods routes GeoJSON URL.
let earthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// Create a style for the lines.
let myStyle = {
    color: 'blue',
    fillColor: 'yellow',
    weight: 1
}

// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(data => {
    // This function returns style data for each earthquake.
    function styleInfo(feature) {
        return{
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: '#000000',
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    };

    // This function determines the color of the circle
    function getColor(magnitude) {
        if (magnitude > 5) {
            return '#ea2c2c';
        }
        if (magnitude > 4) {
            return '#ea822c';
        }
        if (magnitude > 3) {
            return '#ee9c00';
        }
        if (magnitude > 2) {
            return '#eecc00';
        }
        if (magnitude > 1) {
            return '#d4ee00';
        }
        return '#98ee00';
    };

    // This function determines the radius of earthquake
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    };

    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {

        // We turn each feature into a circleMarker on the map.
        pointToLayer: (feature, latlng) => {
            //console.log(data);
            return L.circleMarker(latlng);
        },

        // We set the style for each circleMarker
        style: styleInfo,

        // We create a popup for each circle
        onEachFeature: (feature, layer) => {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);

    // Create a legend control object.
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function() {
        let div = L.DomUtil.create('div', 'info legend');
        const magnitudes = [0,1,2,3,4,5];
        const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ];

        // Loop through intervals to generate a label
        for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
                '<i style="background: ' + colors[i] + '"></i> ' +
                magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
        }
    
        return div;
    };

    legend.addTo(map);

    // Add earthquake layer to map.
    earthquakes.addTo(map);
});
