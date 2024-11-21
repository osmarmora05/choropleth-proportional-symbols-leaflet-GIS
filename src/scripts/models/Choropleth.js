import { BaseMap } from "./BaseMap.js";
import { getColor } from "../utils.js";

export class Choropleth extends BaseMap {
    constructor(mapInstance, config) {
        super(mapInstance, config);
        this.infoControl = null;
        this.legendControl = null;
    }

    get id() {
        return this.config.id;
    }

    get name() {
        return this.config.name;
    }

    get idStr() {
        return this.config.idStr;
    }

    get coordinate() {
        return this.config.coordinate;
    }

    get source() {
        return this.config.source;
    }

    get zoom() {
        return this.config.zoom;
    }

    get interestValue() {
        return this.config.interestValue;
    }



    style = (feature) => {
        return {
            fillColor: getColor(feature.properties[`${this.config.interestValue}`]),
            weight: 2,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
        };
    };

    highlightFeature = (e) => {
        const layer = e.target;
        layer.bringToFront();
        this.infoControl.update(layer.feature.properties);
    }

    zoomToFeature = (e) => {
        this.map.fitBounds(e.target.getBounds());
        this.infoControl.update();
    }

    onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: (e) => this.highlightFeature(e),
            click: (e) => this.zoomToFeature(e),
        });
    }

    addInfoControl = (info) => {
        info.onAdd = () => {
            this._div = L.DomUtil.create("div", "info");
            info.update();
            return this._div;
        };

        info.update = (props) => {
            this._div.innerHTML = `
                <h4>Densidad de población</h4>
                ${props
                    ? `<b>${props.Municipio}</b><br />${props[`${this.config.interestValue}`]} Viviendas`
                    : "Pase el cursor sobre un Municipio"
                }
            `;
        };

        info.addTo(this.map);
        this.infoControl = info;
    }

    addLegend = (legend) => {
        const grades = this.config.grades;

        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend");
            grades.forEach((grade, i) => {
                div.innerHTML += `
                    <i style="background: ${getColor(grade + 1)}"></i>
                    ${grade}${grades[i + 1] ? `&ndash;${grades[i + 1]}<br>` : "+"
                    }
                `;
            });
            return div;
        };

        legend.addTo(this.map);
        this.legendControl = legend;
    }

    layer = () => {
        const geojson = L.geoJSON(this.source, {
            style: this.style,
            onEachFeature: this.onEachFeature,
        });

        return geojson
    }
}