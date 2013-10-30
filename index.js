var incrObject = require('incr-object');

module.exports = function(map) {

    var basicEvents = ['popupopen', 'dragstart', 'load', 'click', 'zoomstart'],
        counters = new incrObject();

    for (var i = 0; i < basicEvents.length; i++) {
        map.on(basicEvents[i], incrType);
    }

    map.on('layeradd', function(e) {
        incrType(e);
    });

    map.eachLayer(trackLayer);

    function trackLayer(layer) {
        var id = L.stamp(layer);
        layer.on('tileload', function(e) {
            counters.incr(id + ':tileload');
        });
    }

    function incrType(e) {
        counters.incr(e.type);
    }

    return {
        counters: function() {
            return counters.entries();
        }
    };
};
