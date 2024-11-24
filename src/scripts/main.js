
import { config } from "./config.js";
import { map } from "../lib/leaflet.js";

const $comboboxCartographicTechnical = document.querySelector("#combobox-cartographic-technique");
const $menu = document.querySelector(".header__menu-label")
const $modal = document.querySelector(".modal")
const $title = document.querySelector(".header__title")
const $repoLink = document.querySelector(".header__github-button")

let index = 0;
let myMap = config.maps[index];
let currentLayer = myMap.layer();
let info = L.control();
let legend = L.control({ position: "bottomright" });

map.setView(myMap.coordinate, myMap.zoom);

currentLayer.addTo(map);
myMap.addInfoControl(info);
info.addTo(map);
myMap.addLegend(legend);
legend.addTo(map);

function generateCartographicTechnicalElements() {
    for (let element of config.maps) {
        const item = document.createElement("option");
        item.textContent = element.idStr;
        $comboboxCartographicTechnical.appendChild(item);
    }
}

function initUi() {
    generateCartographicTechnicalElements();

    const coordinateSystem = document.createElement("p");
    coordinateSystem.innerHTML = config.coordinateSystem;
    $modal.appendChild(coordinateSystem);
    
    const dataSources = document.createElement("p");
    dataSources.innerHTML = config.dataSource; 
    $modal.appendChild(dataSources);
    
    const autor = document.createElement("p");
    autor.innerHTML = config.autor; 
    $modal.appendChild(autor);
    
    const createDate = document.createElement("p");
    createDate.textContent = config.creationDate;
    $modal.appendChild(createDate);

    $title.textContent = config.title

    $repoLink.href = config.repository

}

initUi()


function onChange() {
    const value = $comboboxCartographicTechnical.selectedIndex;
    index = value;
    myMap = config.maps[index];

    if (map.hasLayer(currentLayer)) {
        map.removeLayer(currentLayer);
    }

    currentLayer = myMap.layer();
    currentLayer.addTo(map);

    map.removeControl(info);
    map.removeControl(legend);

    info = L.control();
    myMap.addInfoControl(info);
    info.addTo(map);

    legend = L.control({ position: "bottomright" });
    myMap.addLegend(legend);
    legend.addTo(map);

}

$comboboxCartographicTechnical.onchange = onChange;

$menu.addEventListener("click",()=> {
    $menu.classList.toggle("active")

    if ($modal.style.display == "none"){
        $modal.style.display = "flex"
    }else {
        $modal.style.display = "none"
    }
})
