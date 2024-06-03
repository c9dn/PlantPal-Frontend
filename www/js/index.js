var baseUrl = ""

document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, { passive: false });


function onDeviceReady() {
    console.log("Device is ready"); // Debugging log

    console.log(window.location.href); // Debugging log
    console.log(window.location.pathname); // Debugging log

    if (window.location.href.endsWith("page5.html")) {


        // Define onSuccess function
        var onSuccess = function (position) {
            window.localStorage.setItem("latitude", position.coords.latitude);
            window.localStorage.setItem("longitude", position.coords.longitude);

            if(parseFloat(window.localStorage.getItem("specialFriend")) == 0.01){
                window.location.href = "page6a.html";
            } else {
                window.location.href = "page6b.html";
            }
            
        };

        // Define onError function
        function onError(error) {
            alert("notification3");
            alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }

        // Call getCurrentPosition after defining the functions
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    } else if (window.location.href.endsWith("mapeditor.html")) {
        // Retrieve latitude and longitude from localStorage
        let latitude = parseFloat(window.localStorage.getItem("latitude")) || 51.505;
        let longitude = parseFloat(window.localStorage.getItem("longitude")) || -0.09;

        // Initialize the map with the retrieved coordinates
        let map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
        }).addTo(map);

        let drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        let drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
                edit: true,
                remove: true
            },
            draw: {
                polygon: true,
                polyline: true,
                rectangle: true,
                circle: true,
                marker: true
            }
        });
        map.addControl(drawControl);

        map.on(L.Draw.Event.CREATED, function (event) {
            let layer = event.layer;
            drawnItems.addLayer(layer);
        });

        let drawButton = document.getElementById('draw');
        let eraseButton = document.getElementById('erase');
        let exitButton = document.getElementById('exit');

        drawButton.addEventListener('click', function () {
            drawControl._toolbars.draw._modes.polygon.handler.enable();
        });

        eraseButton.addEventListener('click', function () {
            drawnItems.clearLayers();
        });

        exitButton.addEventListener('click', function () {
            drawControl._toolbars.draw._modes.polygon.handler.disable();
            let allCoordinates = [];

            drawnItems.eachLayer(function (layer) {
                if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
                    let latlngs = layer.getLatLngs();
                    let coordinates = latlngs.map(latlng => latlng.map(point => [point.lat, point.lng]));
                    allCoordinates.push(coordinates);
                } else if (layer instanceof L.Marker) {
                    let latlng = layer.getLatLng();
                    let coordinates = [latlng.lat, latlng.lng];
                    allCoordinates.push(coordinates);
                }
            });

            document.getElementById('pointsData').value = JSON.stringify(allCoordinates);
            document.getElementById('pointsForm').submit();
        });

    } else if (window.location.href.endsWith("page7.html")) {
        // Coordinates for the trees (replace with your own coordinates)


        if(parseFloat(window.localStorage.getItem("treeActivated")) == 0.02){
            var treeCoordinates = [
                { lat: 37.768, lng: -121.907 }
    
            ];
        } else {
            var treeCoordinates = [
                { lat: 51.505, lng: -0.09 },
                { lat: 51.51, lng: -0.1 },
                { lat: 51.49, lng: -0.08 }
    
            ];
        }






        let latitude = parseFloat(window.localStorage.getItem("latitude")) || 51.505;
        let longitude = parseFloat(window.localStorage.getItem("longitude")) || -0.09;


        // Initialize the map
        const map = L.map('map', {
            zoomControl: false // Disable the default zoom control
        }).setView([latitude, longitude], 13);

        // Set up the CartoDB Positron tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '',
            subdomains: 'abcd'
        }).addTo(map);

        // Custom tree icon
        const treeIcon = L.icon({
            iconUrl: 'content/treeIcon.png', // URL to the tree icon
            iconSize: [32, 37], // Size of the icon
            iconAnchor: [16, 37], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -28] // Point from which the popup should open relative to the iconAnchor
        });

        // Add markers for each tree using the custom icon
        treeCoordinates.forEach(coord => {
            L.marker([coord.lat, coord.lng], { icon: treeIcon }).addTo(map);
        });

    } else if (window.location.href.endsWith("page3.html")) {
        function checkServer() {

            window.location.href = 'page4.html';
         
        }

        setInterval(checkServer, 7000); // Check server every 5 seconds

    } 

    document.getElementById('openWebsiteButton').addEventListener('click', openWebsite);

    document.getElementById('deviceready').classList.add('ready');
    }



function openWebsite() {
    var url = 'https://c4ec73dc-1f06-4457-a230-b229e0ad51b8-00-1wulsf1ymabj0.worf.replit.dev/takeImage.html?community=hello123'; // ADD COMMUNITY ID

    var target = '_blank'; // Open in the system browser
    var options = 'location=yes'; // Show the address bar
    window.localStorage.setItem('treeActivated',  0.02);

    cordova.InAppBrowser.open(url, target, options);
}



