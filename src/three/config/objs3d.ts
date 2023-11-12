import * as THREE from 'three';
import { Vector2 } from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';
import { COLORS_SCENE } from './consts';

export interface I3dObjPoint {
  form: THREE.Points | null;
  geom: THREE.BufferGeometry | null;
  mat: THREE.PointsMaterial;
}

export interface I3dObjLine {
  form: Line2;
  geom: LineGeometry;
  mat: LineMaterial;
}

export interface I3dObjPolygon {
  form: THREE.Mesh;
  geom: THREE.Shape;
  mat: THREE.MeshBasicMaterial;
}

const pointObj = (coords: Array<number>) => {
  const position = Float32Array.from(coords);

  const pGeom = new THREE.BufferGeometry();
  pGeom.setAttribute('position', new THREE.BufferAttribute(position, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x888888, size: 6, sizeAttenuation: false });
  const point = new THREE.Points(pGeom, pMat);

  return point;
};

const V2ArrToNumArr = (arr: Array<Vector2>, baseLevel: number) => {
  return arr
    .map((i) => {
      return [i.toArray()[0], 0 - baseLevel, i.toArray()[1]];
    })
    .flat();
};

//DEFAULT MATERIALS
const pMat = new THREE.PointsMaterial({ color: 0x888888, size: 6, sizeAttenuation: false });

//function returning fatline material with given atributes
const getLineMat = (color?: string | number, lineWidth = 2, dash = false, opacity = 1, dashS = 8, dashG = 4) => {
  const lineMaterial = new LineMaterial({
    color: new THREE.Color(color || COLORS_SCENE.common_points).getHex(),
    linewidth: lineWidth,
    resolution: new THREE.Vector2(1920, 1080),
    dashed: dash,
    dashSize: dashS,
    gapSize: dashG,
    //dashOffset: 25,
    opacity: opacity,
  });

  return lineMaterial;
};

const getPolygonMat = (color?: string | number) => {
  const mat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color || 'moccasin'),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
  });

  return mat;
};

export { pointObj, pMat, getLineMat, getPolygonMat, V2ArrToNumArr };
