import { BaseMap } from "./BaseMap.js";
import { getRadius } from "../utils.js";

export class ProportionSymbol extends BaseMap {
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
            radius: getRadius(feature.properties[`${this.config.interestValue}`]),
            fillColor: this.config.fillColorCircle,
            color: this.config.fillColorCircle,
            stroke: true,
            weight: 3,
            color: "#666",
            dashArray: "",
            fillOpacity: 1

        };
    };

    highlightFeature = (e) => {
        const layer = e.target;
        if (layer._radius) {

            this.infoControl.update(layer.feature.properties);
        }

    }

    zoomToFeature = (e) => {
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
                <h4>Cantidad de viviendas</h4>
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

                const nextGrade = grades[i + 1];
                const radius = getRadius(grade);

                div.innerHTML += `
                <i style="
                    width: ${radius * 0.9}px;
                    height: ${radius * 0.9}px;
                    background: ${this.config.fillColorCircle};
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 8px;
                "></i>
                ${grade}${nextGrade ? `&ndash;${nextGrade}<br>` : "+"}
            `;
            });
            return div;
        };

        legend.addTo(this.map);
        this.legendControl = legend;
    }


    layer = () => {
        const geojson = L.geoJSON(this.source, {
            style: {
                stroke: true,
                color: this.config.fillMap,
                weight: 1,
            },
            onEachFeature: this.onEachFeature,
            pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, this.style(feature));
            }
        });

        return geojson;
    };
}