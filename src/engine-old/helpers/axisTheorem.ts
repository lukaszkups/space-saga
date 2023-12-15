import { Axis, Polygon } from "../types";

// Function to check if two polygons are intersecting using Separating Axis Theorem
export const projectPolygon = (axis: Axis, polygon: Polygon): number[] => {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  for (const point of polygon) {
      const dotProduct = axis[0] * point[0] + axis[1] * point[1];
      min = Math.min(min, dotProduct);
      max = Math.max(max, dotProduct);
  }

  return [min, max];
}

export const axisOverlap = (axis: Axis, poly1: Polygon, poly2: Polygon): boolean => {
  const [min1, max1] = projectPolygon(axis, poly1);
  const [min2, max2] = projectPolygon(axis, poly2);

  return !(max1 < min2 || max2 < min1);
}

export const getAxes = (poly: Polygon): Axis[] => {
  const axes = [];

  for (let i = 0; i < poly.length; i++) {
      const point1 = poly[i];
      const point2 = i + 1 === poly.length ? poly[0] : poly[i + 1];

      const edge = [point1[0] - point2[0], point1[1] - point2[1]];
      const axis = [-edge[1], edge[0]]; // Perpendicular axis

      axes.push(axis);
  }

  return axes;
}

const arePolygonsIntersecting = (poly1: Polygon, poly2: Polygon): boolean => {

  const axes = [...getAxes(poly1), ...getAxes(poly2)];

  for (const axis of axes) {
      if (!axisOverlap(axis, poly1, poly2)) {
          return false; // Separating axis found
      }
  }

  return true; // No separating axis found, polygons are intersecting
}

// Example usage
// const polygon1 = [[0, 0], [2, 0], [2, 2], [0, 2]];
// const polygon2 = [[1, 1], [3, 1], [3, 3], [1, 3]];

// const collisionDetected = arePolygonsIntersecting(polygon1, polygon2);

// console.log(" detected:", collisionDetected);

export default arePolygonsIntersecting;
