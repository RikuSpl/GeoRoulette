const countryPages = {
    IS: "Islanti.html",
    MA: "Marokko.html",
    JP: "japani.html",
    China: "kiina.html",
    FI: "suomi.html",
    Australia: "Australia.html"
}

const button = document.getElementById("rbtn");

button.addEventListener("click", startRoll);

function getCountryElements(code) {

    const byId = document.getElementById(code);

    if (byId) {
        return [byId];
    }
    else {
        return document.querySelectorAll(`.${code}`); 
    }
}

function startRoll() {
    const countries = Object.keys(countryPages)

    let currentCountry = null;

    currentCountry = countries[Math.floor(Math.random() * countries.length)];
    
    getCountryElements(currentCountry).forEach(el => {el.classList.add("active")});
}

