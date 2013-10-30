var leafletStats = require('../');

var map = L.mapbox.map('map', 'examples.map-9ijuk24y')
    .setView([40, -74.50], 9);

var stats = leafletStats(map);

document.getElementById('show-report').onclick = function() {
    document.getElementById('report').innerHTML =
        JSON.stringify(stats.counters(), null, 2);
};
