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

async function getWeatherData(long, lat) {
    try {
        const results = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=a783ff1b655a8efef32760dc98437171`)
        
        if(!results.ok) {
            // on créer une erreur
            throw new Error(`Erreur: ${results.status}`)
        }
        const data = await results.json();
        console.log(data);
        // on enleve le loader
        loader.classList.add("fade-out");
    }

    catch(e) {
        loader.textContent = e;
    }
}