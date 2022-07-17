import { Polygon } from 'ol/geom';

class EPCSPolygon extends Polygon {
  constructor(coordinates, options) {
    super(coordinates, options);
  }
}

export { EPCSPolygon as default };
