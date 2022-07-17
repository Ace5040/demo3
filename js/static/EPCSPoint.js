import Point from 'ol/geom/Point';

class EPCSPoint extends Point {
    constructor(coordinates, options) {
        super(coordinates, options);
    }
}

export { EPCSPoint as default };
