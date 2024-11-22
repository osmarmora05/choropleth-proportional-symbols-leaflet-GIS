import { map } from "../lib/leafflet.js";
import { Choropleth, ProportionSymbol } from "./models/index.js";

const MapOfManaguaCoropleta = await fetch(
    "./src/layers/Managua-densidad-de-viviendas-coropleta.geojson"
)
    .then((response) => response.json())
    .catch((error) => {
        console.error(`Error al cargar el archivo GeoJSON desde ${url}:`, error);
        return null;
    });
const MapOfManaguaProportionalSymbol = await fetch(
    "./src/layers/Managua-densidad-de-viviendas-símbolos-proporcionales.geojson"
)
    .then((response) => response.json())
    .catch((error) => {
        console.error(`Error al cargar el archivo GeoJSON desde ${url}:`, error);
        return null;
    });

export const config = {
    autor: `Autor: Osmar Adrian Mora Cerna<br/>
Estudiante de la clase Sistemas<br/>
de Información Geográfica`,
    coordinateSystem: `Sistema de coordenadas<br/>
EPSG:4326 - WGS 84`,
    dataSource: `Fuente de datos:<br/>
Capas cartografía de INETER<br/>
Mapa base OpenStreetMap`,
    creationDate: "Diriamba, 22 de noviembre del 2024",
    repository: "https://github.com/osmarmora05/choropleth-proportionalSymbols-leaflet-GIS",
    vividColors: true,
    showLabels: false,
    title: "Densidad de las viviendas de la capital Managua, Nicaragua",
    maps: [
        new Choropleth(map, {
            id: 0,
            idStr: "Coropleta",
            name: "Densidad de las viviendas de la capital Managua, Nicaragua",
            coordinate: [12.1935, -86.4368],
            zoom: 10,
            interestValue: "Viviendas_",
            grades: [0, 1498, 3353, 3602, 4400, 7042, 14403, 168060],
            source: MapOfManaguaCoropleta,
        }),
        new ProportionSymbol(map, {
            id: 1,
            idStr: "Símbolos proporcionales",
            name: "Densidad de las viviendas de la capital Managua, Nicaragua",
            coordinate: [12.1935, -86.4368],
            zoom: 10,
            interestValue: "Viviendas_",
            fillMap: "green",
            fillColorCircle: "#Ff7800",
            grades: [0, 1498, 3353, 3602, 4400, 7042, 14403, 168060],
            source: MapOfManaguaProportionalSymbol,
        }),
    ],
};