import * as THREE from 'three';
import { Line2, LineGeometry, LineMaterial } from 'three-fatline';

const pointObj = (coords: any) => {
    let position = Float32Array.from(coords)
    let pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute( 'position', new THREE.BufferAttribute( position, 3 ) );
    let pMat = new THREE.PointsMaterial( { color: 0x888888, size: 6, sizeAttenuation: false} );
    let point = new THREE.Points(pGeom, pMat);
    
    return point
};

const pMat = new THREE.PointsMaterial( { color: 0x888888, size: 6, sizeAttenuation: false} );

const lineObj = (coords: any) => {
    const lGeom = new THREE.BufferGeometry()
    .setFromPoints(coords)

    const LMat = new THREE.LineBasicMaterial({
        color: 0x000000
    });

    const line = new THREE.Line( lGeom, LMat );

    return line
};

const fatLineObj = (coords: Array<number>) => {
    const lGeom = new LineGeometry();
    lGeom.setPositions(coords);

    const lMat = new LineMaterial({
        color: 0x000000,
        linewidth: 3,
        resolution: new THREE.Vector2(1920, 1080)
    });

    const line = new Line2(lGeom, lMat);
    line.computeLineDistances();

    return line;
}

//function returning fatline material with given atributes
const getLineMat = (color = 0xffffff, lineWidth = 2, dash = false, opacity = 1) => {
	const lineMaterial = new LineMaterial({
		color: color,
		linewidth: lineWidth,
		resolution: new THREE.Vector2(1920, 1080),
		dashed: dash,
		opacity: opacity
	
	});

	return lineMaterial;
}

const getPolygonMat = () => {
	const mat = new THREE.MeshBasicMaterial( { 
		color: new THREE.Color('moccasin'), 
		side: THREE.DoubleSide, 
		transparent:true,
		opacity: 0.5 
	} );

	return mat
}


const lMat = new LineMaterial({
    color: 0x0E89E1,
    linewidth: 2,
    resolution: new THREE.Vector2(1920, 1080),
    dashed: true,
    opacity: 0.8

});

const lMat2 = new LineMaterial({
    color: 0x000000,
    linewidth: 3,
    resolution: new THREE.Vector2(1920, 1080)
});

const lGeom = new LineGeometry();


export {
	pointObj, lineObj, fatLineObj,
	lMat, lMat2, lGeom, pMat, getLineMat,
	getPolygonMat}