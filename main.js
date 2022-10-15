const loader = document.querySelector(".loader")

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(location => {
        const long = location.coords.longitude;
        const lat = location.coords.latitude;
        getWeatherData(lon, lat)
    }, () => {
        // En cas de refus on affiche
        loader.textContent = "Vous avez refuser la géolocalisation, veuillez l'activer."
    })
}