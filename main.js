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
        populateMAinInfo(data);
        handleHours(data.hourly);
        // on enleve le loader
        loader.classList.add("fade-out");
    }

    catch(e) {
        loader.textContent = e;
    }
}

const position = document.querySelector(".position");
const temperature = document.querySelector(".temperature");
const weatherImage = document.querySelector(".weather-image");

// prendre la date actuelle
const currentHour = new Date().getHours()
function populateMAinInfo(data) {
    // on va chercher dans l'objet data la temperature
    temperature.textContent = `${Math.trunc(data.current.temp)}°`
    position.textContent = data.timezone;

    if(currentHour >= 6 && currentHour < 21) {
        weatherImage.src = `ressources/jour/${data.current.weather[0].icon}.svg`
    }else{
        weatherImage.src = `ressources/nuit/${data.current.weather[0].icon}.svg`
    }

}
const hourNameBlocks = document.querySelectorAll(".hour-name")
const hourTemperatures = document.querySelectorAll(".hour-temp")

function handleHours(data) {
    hourNameBlocks.forEach((block, index) => {
        // pour changer l'heure de +3 heures
        const incrementedHour = currentHour + index*3

        if(incrementedHour > 24) {
            const calcul = incrementedHour - 24;
            hourNameBlocks[index].textContent = `${calcul === 24 ? "00" : calcul}h`
        } else if(incrementedHour === 24) {
            hourNameBlocks.textContent = "00h";
        }else {
            hourNameBlocks[index].textContent = `${incrementedHour}h`
        }
        // temperatures
        hourTemperatures[index].textContent = `${Math.trunc(data[index * 3].temp)}°`


    })
}

