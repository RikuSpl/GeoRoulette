// all current country pages listed into key value pairs
const countryPages = {
    IS: "Islanti.html",
    MA: "Marokko.html",
    JP: "Japan.html",
    China: "kiina.html",
    CN: "Canada.html",
    Gr: "Germany.html",
    CB: "cambodia.html",
    BR: "Brazil.html",
}

//adds click listener to button
const button = document.getElementById("rbtn");
button.addEventListener("click", startRoll);

//workaround function to solve id/class inconsistency in the svg file paths
function getCountryElements(code) {

    const byId = document.getElementById(code);

    if (byId) {
        return [byId];
    }
    else {
        return document.querySelectorAll(`.${code}`); 
    }
}

let rolling = false;
//funciton for rolling, executes every time the roll button is pressed
function startRoll() {

    if(rolling) {
        return;
    }
    rolling = true;

    //clears any previous highlighting by removing the "active" class from all "path"s
    document.querySelectorAll("path").forEach(path => {path.classList.remove("active")});

    //makes an array "countries" from the countrypages keys
    const countries = Object.keys(countryPages)

    //declares currentCountry variable at "null"
    let currentCountry = null;

    //declares "delay" variable at 60ms, which means the first highlights during the animation will be very fast
    let delay = 80

    let elapsed = 0

    function rollAnim() {
        //while currentCountry has a value, remove it's highlighting
        if(currentCountry) {
            getCountryElements(currentCountry).forEach(el => {el.classList.remove("active")})
        }
    
        //assigns variable "currentcountry" with the value of one random country 
        currentCountry = countries[Math.floor(Math.random() * countries.length)];
        
        //adds the "active" class to the selected country, highlighting it
        getCountryElements(currentCountry).forEach(el => {el.classList.add("active")});

        //assigns the value of delay to elapsed, and then multiplies the value of delay, making the elapsed variable grow on each passthrough, until it goes over the breakpoint
        elapsed += delay;
        delay *= 1.2;

        //if "elapsed" is less than 6000, runs the "rollAnim()" function again, with a timeout delay of the value of "delay" (which will be longer on every passthrough) 
        if(elapsed < 6000) {
            setTimeout(rollAnim, delay);
        }
        //calls the finishRoll() function once the breakpoint for elapsed is hit
        else {
            finishRoll(currentCountry);
        }

    }

    //calls the rollAnim function
        rollAnim();

}

//function that gets called when the timer in rollAnim() ends, this adds a red highlight to the final selected country and then redirects to it
function finishRoll(code) {
    //clears any previous highlighting by removing the "active" class from all "path"s
    document.querySelectorAll("path").forEach(path => {path.classList.remove("active")});

    //adds the "final" class to the selected country, highlighting it red
    getCountryElements(code).forEach(el => {el.classList.add("final")})

    //slight delay before redirecting to the appropriate countryPage
    setTimeout(() => {
        window.location.href = countryPages[code]
    }, 2000);
}

