var dbRef = firebase.database().ref('coordinates');
//var map = L.map('mapOpenStreet');//.setView([16.784851, 96.161613], 7);  //, 14.4373);
var map = L.map("mapOpenStreet", {
    center: [16.807022, 96.217989],
    zoom: 12,
    fadeAnimation: true,
    zoomAnimation: true
});
//var lineLayer = L.geoJSON().addTo(map);

dbRef.once('value').then(data_loader);

dbRef.on('value', (refreshMarker));

function data_loader(obj) {
    document.getElementById('lat').innerHTML = obj.val().lat
    document.getElementById('lon').innerHTML = obj.val().lon
    document.getElementById('status').innerHTML = "GNSS system is now " + obj.val().status
    document.getElementById('speed').innerHTML = "Movement Speed is : " + obj.val().speed
    document.getElementById('lastRun').innerHTML = "Last RUN : " + obj.val().lastRun
    map.setView([obj.val().lat, obj.val().lon], 15, {
        pan: {
            animate: true,
            duration: 2.5
        },
        zoom: {
            animate: true
        }
    });
}

var layerGroup = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, developed by <a href="www.example.com">project-C</a> team'
}).addTo(map);

//L.marker([16.815865867, 96.2133101]).addTo(map)
//    .bindPopup('project-C')
//.openPopup();

//var popup = L.popup()
//.setLatLng([16.707021,96.217989])
//.setContent("Hey, I am here")
//.openOn(mymap);
function refreshMarker(obj) {
    layerGroup.clearLayers();
    L.marker([obj.val().lat, obj.val().lon]).addTo(layerGroup).bindPopup('<p class="text-warning">project-C</p>').openPopup();
    map.flyTo([obj.val().lat, obj.val().lon], 15, {
        pan: {
            animate: true,
            duration: 2.5
        },
        zoom: {
            animate: true
        }
    });
}


var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Clicked lat lon : " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

var pathLines = [{
    "type": "LineString",
    "coordinates": [
        [96.21787331400009, 16.807301953000035],
[96.21782000000007, 16.80728000000005],
[96.21766000000008, 16.80705000000006],
[96.21781000000004, 16.806730000000073],
[96.21820000000008, 16.806700000000035],
[96.21839000000006, 16.807100000000048],
[96.21816000000007, 16.807330000000036],
[96.21793000000008, 16.80768000000006],
[96.21787000000006, 16.80812000000003],
[96.21784000000008, 16.808290000000056],
[96.21777000000009, 16.80878000000007],
[96.21771000000007, 16.80923000000007],
[96.21764000000007, 16.809700000000078],
[96.21757000000008, 16.810110000000066],
[96.21748000000008, 16.810580000000073],
[96.21738000000005, 16.811040000000048],
[96.21726000000007, 16.811470000000043],
[96.21707000000004, 16.81191000000007],
[96.21693000000005, 16.812280000000044],
[96.21507000000008, 16.817130000000077],
[96.21500000000003, 16.817310000000077],
[96.21369000000004, 16.81669000000005],
[96.21325000000007, 16.816380000000038],
[96.21281000000005, 16.816050000000075],
[96.21235000000007, 16.815710000000024],
[96.21193000000005, 16.815390000000036],
[96.21163000000007, 16.815750000000037],
[96.21135000000004, 16.81609000000003],
[96.21100000000007, 16.81651000000005],
[96.21033000000006, 16.816820000000064],
[96.20970000000005, 16.81624000000005],
[96.20889000000005, 16.815620000000024],
[96.20845000000008, 16.81538000000006],
[96.20830000000007, 16.815300000000036],
[96.20795000000004, 16.81510000000003],
[96.20785000000006, 16.815050000000042],
[96.20739000000003, 16.814800000000048],
[96.20703000000003, 16.81456000000003],
[96.20610000000005, 16.813930000000028],
[96.20707212200006, 16.812636274000056]]
}];

data = [{
    "type": "LineString",
    "coordinates": [
        [96.21791,16.80769],
        [96.21786,16.80812],
        [96.21784,16.80829],
        [96.2178,16.80867],
        [96.21778,16.80878],
        [96.21774,16.80908],
        [96.21771,16.8092],
        [96.21764,16.80968],
        [96.21756,16.81013],
        [96.21747,16.81058],
        [96.21736,16.81101],
        [96.21725,16.81145],
        [96.21705,16.81194],
        [96.21693,16.81221],
        [96.21678,16.81261],
        [96.21648,16.81338],
        [96.2165,16.81344],
        [96.21592,16.81499],
        [96.21557,16.81593],
        [96.21549,16.81598],
        [96.21509,16.81709],
        [96.215,16.81731]
]
}];

//lineLayer.addData(pathLines , {color: "#00ff00", weight:150});

L.geoJSON(data, {
    style: {
        color: "#3333ff",
        weight: 5,
        opacity: 0.65
    }
}).addTo(map);


//var aT0625124projectlimits = {
//    "type": "FeatureCollection",
//    "features": [{
//      "type": "Feature",
//      "geometry": {
//        "type": "LineString",
//        "coordinates": [
//            [96.21793,16.807511],
//            [96.217865,16.808343],
//            [96.217769,16.809]
//        ]
//      },
//      "properties": {
//        "OBJECTID": 17,
//        "Contract_N": "initial_path",
//        "SHAPE_Leng": "53224.7785428",
//        "Completion": "100"
//      }
//    }]
//  }
//  
//  L.geoJson(aT0625124projectlimits, {
//    style: function(feature) {
//      return {
//        stroke: true,
//        color: "red",
//        weight: 5
//      };
//    },
//    onEachFeature: function(feature, layer) {
//      layer.bindPopup("id: " + feature.properties.OBJECTID + "<br>" +
//        "Contract_N: " + feature.properties.Contract_N);
//    }
//  }).addTo(map);