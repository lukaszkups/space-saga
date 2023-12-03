import arePolygonsIntersecting from "./helpers/axisTheorem";
import { Polygon } from "./types";

export default class Physics {
  constructor () {

  }

  collides(poly1: Polygon, poly2: Polygon): boolean {
    return arePolygonsIntersecting(poly1, poly2);
  }
}
