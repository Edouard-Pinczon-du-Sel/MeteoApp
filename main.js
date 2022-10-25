const loader = document.querySelector(".loader")

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(location => {
        const long = location.coords.longitude;
        const lat = location.coords.latitude;
        getWeatherData(long, lat)
    }, () => {
        // En cas de refus on affiche
        loader.textContent = "Vous avez refuser la géolocalisation, veuillez l'activer."
    })
}

async function getWeatherData(long, lat) {
    try {
        const results = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=5f1dbdba034a55084dc87f318fe5e5a3`)
        
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