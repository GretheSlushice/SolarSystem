import { Engine } from "./engine";
import { Planet } from "./planet";
import { Vector } from "./vector";
import { Star } from "./star";
import earthImg from "../../pics/earthlike.png";
import gasImg from "../../pics/gasplanet.png";
import iceImg from "../../pics/iceplanet.png";
import rockImg from "../../pics/rockplanet.png";
import sunImg from "../../pics/sun.png";

let System = new Engine();
let earth = <HTMLImageElement>document.getElementById('earth');
let gas = <HTMLImageElement>document.getElementById('gas');
let ice = <HTMLImageElement>document.getElementById('ice');
let rock = <HTMLImageElement>document.getElementById('rock');
let sun = <HTMLImageElement>document.getElementById('sun');
earth.src = earthImg;
gas.src = gasImg;
ice.src = iceImg;
rock.src = rockImg;
sun.src = sunImg;

let starContent = <HTMLDivElement>document.getElementById('starAtt')
let planetContent = <HTMLDivElement>document.getElementById('objectAtt');
let planetList = <HTMLDivElement>document.getElementById('planets');

let expandImg = <HTMLImageElement>document.getElementById('expand');
expandImg.src = "https://img.icons8.com/small/16/000000/collapse-arrow.png";

let navPlanets = <HTMLDivElement>document.getElementById('navObjects');
loadList();

var navButton = document.getElementsByClassName('collapsible');
navButton[0].addEventListener("click", function () {
    if (navPlanets.style.display != 'none') {
        navPlanets.style.display = 'none';
        planetContent.style.display = 'none';
        expandImg.src = "https://img.icons8.com/small/16/000000/expand-arrow.png";
    }
    else {
        navPlanets.style.display = '';
        expandImg.src = "https://img.icons8.com/small/16/000000/collapse-arrow.png";
    }
});

let addPlanet = <HTMLLabelElement>document.getElementById('addNew');
addPlanet.addEventListener("click", function() {
    System.AddNew();
    loadList();
})

function loadList() {
    planetList.innerHTML = "";
    let star = <HTMLImageElement>document.createElement('img');
    star.src = getImage("");
    star.alt = "sun";
    star.className = "image"
    //planetList.innerHTML += "<label id=\"LiPlanet\" class=\"btn btn-secondary\"><input id=\"choose" + System.star.name + "\" type=\"radio\" name=\"options\" autocomplete=\"off\">" + star.outerHTML + "</label>";

    let tempDiv = <HTMLDivElement>document.createElement('div');

    let tempInput = <HTMLInputElement>document.createElement('input');
    tempInput.value = System.star.name;
    tempInput.style.display = 'none';
    tempInput.type = "text";
    tempInput.addEventListener("keyup", event => {
        if (event.isComposing || event.keyCode === 13)
        {
            System.star.name = tempInput.value;
            tempP.innerHTML = System.star.name;
            tempInput.style.display = 'none';
            tempP.style.display = 'block';
            return
        }
            
    })

    let tempP = <HTMLParagraphElement>document.createElement('p');
    tempP.innerHTML = System.star.name;
    tempP.addEventListener("click", function() {
        tempP.style.display = 'none';
        tempInput.style.display = 'block';
    })

    let tempButton = <HTMLInputElement>document.createElement("input");
    tempButton.name = "options";
    tempButton.autocomplete = "off";
    tempButton.className = "btn btn-secondary";
    tempButton.type = "radio";

    let label = <HTMLLabelElement>document.createElement('label');
    label.id = "LiPlanet";
    label.className = "btn btn-secondary";

    label.appendChild(star);
    label.appendChild(tempButton);
    label.addEventListener("click", getStarAttributes(System.star));
    tempDiv.appendChild(label);
    tempDiv.appendChild(tempP);
    tempDiv.appendChild(tempInput);
    planetList.appendChild(tempDiv);

    System.objects.forEach(element => {
        let tempDiv = <HTMLDivElement>document.createElement('div');

        let tempP = <HTMLParagraphElement>document.createElement('p');
        tempP.innerHTML = element.name;

        let tempButton = <HTMLInputElement>document.createElement("input");
        tempButton.name = "options";
        tempButton.autocomplete = "off";
        tempButton.id = "choose" + element.name;
        tempButton.type = "radio";

        let image = <HTMLImageElement>document.createElement('img');
        image.src = getImage(element.type);
        image.className = "image";
        image.alt = element.type+" planet";

        let label = <HTMLLabelElement>document.createElement('label');
        label.id = "LiPlanet";
        label.className = "btn btn-secondary";

        tempDiv.appendChild(tempButton);
        tempDiv.appendChild(tempP);
        label.appendChild(image);
        label.appendChild(tempDiv);
        label.addEventListener("click", getAttributes(element));
        planetList.appendChild(label);
    });
}

function getAttributes(planet: Planet) {
    return function () {
        if (planetContent.style.display != 'block' || starContent.style.display == 'block') {
            planetContent.style.display = 'block';
            starContent.style.display = 'none';
        }
        let size = <HTMLInputElement>document.getElementById('planetSize');
        size.max = "100";
        size.min = "1";
        size.value = String(planet.radius * 10);

        let sizeOutput = <HTMLParagraphElement>document.getElementById('SizeOutput');
        sizeOutput.innerHTML = String(planet.radius);
        size.oninput = function () {
            sizeOutput.innerHTML = String(Number(size.value) / 10);
            planet.radius = Number(size.value) / 10;
        }

        let aph = <HTMLInputElement>document.getElementById('planetAph');
        aph.max = "1000";
        aph.min = String(planet.getOrbit().perihelion * 10);
        aph.value = String(planet.getOrbit().aphelion * 10);

        let aphOutput = <HTMLParagraphElement>document.getElementById('AphOutput');
        aphOutput.innerHTML = String(planet.getOrbit().aphelion);
        aph.oninput = function () {
            aphOutput.innerHTML = String(Number(aph.value) / 10);
            planet.getOrbit().aphelion = Number(aph.value) / 10;
            planet.getOrbit().calcSemiLatus(new Vector(planet.pos.x + planet.getOrbit().starPos.x, planet.pos.y + planet.getOrbit().starPos.y), planet.getOrbit().starPos);
            per.max = String(Number(aph.value) - 0.1);
        }

        let per = <HTMLInputElement>document.getElementById('planetPer');
        per.max = String(Number(aph.value) - 0.1);
        per.min = "1";
        per.value = String(planet.getOrbit().perihelion * 10);

        let perOutput = <HTMLParagraphElement>document.getElementById('PerOutput');
        perOutput.innerHTML = String(planet.getOrbit().perihelion);
        per.oninput = function () {
            perOutput.innerHTML = String(Number(per.value) / 10);
            planet.getOrbit().perihelion = Number(per.value) / 10;
            planet.getOrbit().calcSemiLatus(new Vector(planet.pos.x + planet.getOrbit().starPos.x, planet.pos.y + planet.getOrbit().starPos.y), planet.getOrbit().starPos);
            aph.min = String(Number(per.value) + 0.1);
        }

        let rot = <HTMLInputElement>document.getElementById('orbitRot');
        rot.max = "360";
        rot.min = "0";
        rot.value = String(planet.rotation);

        let rotOutput = <HTMLParagraphElement>document.getElementById('RotOutput');
        rotOutput.innerHTML = String(planet.rotation);
        rot.oninput = function () {
            rotOutput.innerHTML = rot.value;
            planet.rotation = Number(rot.value);
        }

        let type = <HTMLSelectElement>document.getElementById('planetType');
        type.value = planet.type;
        type.onchange = function () {
            planet.type = type.value;
            loadList();
        }
    }
}
function getStarAttributes(star: Star) {
    return function () {
        if (planetContent.style.display == 'block' || starContent.style.display != 'block') {
            planetContent.style.display = 'none';
            starContent.style.display = 'block';
        }

        let size = <HTMLInputElement>document.getElementById('starSize');
        size.max = "200";
        size.min = "1";
        size.value = String(star.radius * 10);

        let sizeOutput = <HTMLParagraphElement>document.getElementById('StarSizeOutput');
        sizeOutput.innerHTML = String(star.radius);
        size.oninput = function () {
            sizeOutput.innerHTML = String(Number(size.value) / 10);
            star.radius = Number(size.value) / 10;
        }
    }
}

function getImage(type: string): string {
    if (type == "earth") {
        return earthImg;
    }
    else if (type == "ice") {
        return iceImg;
    }
    else if (type == "rock") {
        return rockImg;
    }
    else if (type == "gas") {
        return gasImg;
    }
    else {
        return sunImg;
    }
}