export class BaseMap {
    constructor(mapInstance, config) {
        this.map = mapInstance;
        this.config = config;
    }
    style = (feature) => {}
    highlightFeature = (e) =>{ }
    zoomToFeature = (e) => { }
    onEachFeature = (feature, layer) => { }
    layer = () =>{}
    get id() { }
    get name() { }
    get idStr() { }
    get coordinate() { }
    get source() { }
    get zoom() { }
    get interestValue() { }
}