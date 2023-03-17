let map;
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 8,
  });

  const marker = new google.maps.Marker({
        title: 'ISS',
        position: { lat: 0, lng: 0 },
        map: map,
        clickable: true,
        icon: {
            url: 'images/sattelite-icon.png',
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    setInterval(() => {
        const promise = getISSData();
        promise.then(issData => {
            const coords = { lat: issData.lat, lng: issData.lng };
            map.setCenter(coords);
            updateMarkerPosition(coords, marker);
        });
    }, 2000);
}

window.initMap = initMap;

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


async function getISSData() {
    const data = await fetchData(api_url);
    const issData = {
        lat: data.latitude,
        lng: data.longitude
    };
    map.center = issData;
    return issData;
}

function updateMarkerPosition(coords, marker) {
    const newPosition = new google.maps.LatLng(coords.lat, coords.lng);
    marker.setPosition(newPosition);
}