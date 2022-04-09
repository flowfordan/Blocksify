import * as THREE from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';

const geometry = new THREE.BoxGeometry(10,10,10)
const material = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    wireframe: false,
})

const cube = new THREE.Mesh(geometry, material)
cube.receiveShadow = true;
cube.castShadow = true;
cube.position.set(0, 5, 0)



let coord = [10, 0.02, 10, 10, 0.02, 25];
let coord2 = [5, 0.02, 10, 5, 0.02, 45, 20, 0.02, 20];

const geomLine = new LineGeometry();
geomLine.setPositions(coord);

const geomLine2 = new LineGeometry();
geomLine2.setPositions(coord2);

const matLine = new LineMaterial({
    color: 10,
    linewidth: 2,
    resolution: new THREE.Vector2(640, 480), // resolution of the viewport
    dashed: true,
    dashScale: 2,
    dashSize: 2,
    gapSize: 1

});

const myLine = new Line2(geomLine, matLine);

const myLine2 = new Line2(geomLine2, matLine);

myLine.computeLineDistances();
myLine2.computeLineDistances();

export {cube, myLine, myLine2}