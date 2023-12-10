import Entity from "./Entity";
import Layer from "./SceneLayer";
import Scene from "./Scene";
import Sprite from "./Sprite";

export interface Keyable {
  [index: string]: string | number | Object | Array<any> | Keyable;
}

export type Polygon = Array<[number, number]>;
export type Axis = number[];
export type Pin {
  [index: string]: Entity | Sprite | Polygon;
}
export type KeyableLayer = {
  [key: string]: Layer;
}

export type KeyableEntity = {
  [key: number]: Entity;
}

export type KeyableScene = {
  [key: number]: Scene;
}

export type Coords = Array<[number, number]>;
